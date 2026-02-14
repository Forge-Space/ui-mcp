import type { IFigmaVariable } from './types.js';
import { createLogger } from './logger.js';

const logger = createLogger('figma-client');

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_API_TIMEOUT_MS = 30_000;

/**
 * Generate a unique temporary ID for Figma variables.
 * Uses crypto.randomUUID() for thread-safe unique ID generation.
 */
function generateTempVariableId(): string {
  return `temp_var_${Date.now()}_${crypto.randomUUID()}`;
}

function getToken(): string {
  const token = process.env['FIGMA_ACCESS_TOKEN'];
  if (!token) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is not set');
  }
  return token;
}

async function figmaFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const url = `${FIGMA_API_BASE}${path}`;
  const method = options.method ?? 'GET';

  const response = await fetch(url, {
    ...options,
    headers: {
      'X-Figma-Token': getToken(),
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: AbortSignal.timeout(FIGMA_API_TIMEOUT_MS),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Figma API error [${method} ${path}]: ${response.status} ${response.statusText}\n${text}`);
  }

  return response.json();
}

export interface FigmaFileResponse {
  name: string;
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  styles: Record<string, FigmaStyle>;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  style?: Record<string, unknown>;
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number };
  characters?: string;
  [key: string]: unknown;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
}

export interface FigmaStyle {
  key: string;
  name: string;
  styleType: string;
  description: string;
}

export interface FigmaFill {
  type: string;
  color?: { r: number; g: number; b: number; a: number };
  opacity?: number;
}

export interface FigmaStroke {
  type: string;
  color?: { r: number; g: number; b: number; a: number };
}

export function getFile(fileKey: string): Promise<FigmaFileResponse> {
  return figmaFetch(`/files/${fileKey}`) as Promise<FigmaFileResponse>;
}

export function getFileNodes(
  fileKey: string,
  nodeIds: string[]
): Promise<{ nodes: Record<string, { document: FigmaNode }> }> {
  const ids = nodeIds.join(',');
  return figmaFetch(`/files/${fileKey}/nodes?ids=${encodeURIComponent(ids)}`) as Promise<{
    nodes: Record<string, { document: FigmaNode }>;
  }>;
}

export interface FigmaVariablesResponse {
  status: number;
  error: boolean;
  meta: {
    variableCollections: Record<string, unknown>;
    variables: Record<string, unknown>;
  };
}

export function getVariables(fileKey: string): Promise<FigmaVariablesResponse> {
  return figmaFetch(`/files/${fileKey}/variables/local`) as Promise<FigmaVariablesResponse>;
}

export interface PostVariablesPayload {
  variableCollections?: Array<{
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    id?: string;
    name?: string;
    initialModeId?: string;
  }>;
  variableModes?: Array<{
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    id?: string;
    name?: string;
    variableCollectionId?: string;
  }>;
  variables?: Array<{
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    id?: string;
    name?: string;
    variableCollectionId?: string;
    resolvedType?: string;
    codeSyntax?: Record<string, string>;
  }>;
  variableModeValues?: Array<{
    variableId: string;
    modeId: string;
    value: unknown;
  }>;
}

const RETRY_BASE_DELAY_MS = 500;
const MAX_RETRY_DELAY_MS = 5000;
const MAX_RETRIES = 3;
const OVERALL_RETRY_TIMEOUT_MS = 60_000;

export async function postVariables(
  fileKey: string,
  variables: IFigmaVariable[],
  collectionName: string = 'UIForge Tokens'
): Promise<{ created: number; updated: number; collections: string[] }> {
  // First, get existing variables to check for updates
  let existingVariablesResponse: FigmaVariablesResponse | null = null;
  try {
    existingVariablesResponse = await getVariables(fileKey);
  } catch (e) {
    logger.debug({ err: e, fileKey }, 'getVariables failed while fetching variables for file');
    // File may not have variables yet
  }

  const existingCollections = existingVariablesResponse?.meta?.variableCollections ?? {};
  const existingVariables = existingVariablesResponse?.meta?.variables ?? {};

  let targetCollectionId: string | undefined;
  let targetModeId: string | undefined;

  // Find existing collection
  for (const [id, collection] of Object.entries(existingCollections)) {
    if ((collection as Record<string, unknown>)['name'] === collectionName) {
      targetCollectionId = id;
      const modes = (collection as Record<string, unknown>)['modes'] as Array<{ modeId: string }> | undefined;
      if (modes?.[0]) {
        targetModeId = modes[0].modeId;
      }
      break;
    }
  }

  const payload: PostVariablesPayload = {
    variableCollections: [],
    variables: [],
    variableModeValues: [],
  };

  // Create collection if needed
  const isNewCollection = !targetCollectionId;
  if (isNewCollection) {
    const temporaryCollectionId = `temp_collection_${Date.now()}`;
    payload.variableCollections!.push({
      action: 'CREATE',
      id: temporaryCollectionId,
      name: collectionName,
    });
    targetCollectionId = temporaryCollectionId;
    // targetModeId will be determined after POST for new collections
  }

  let created = 0;
  let updated = 0;

  // Map existing variable names to IDs
  const existingVarMap = new Map<string, string>();
  for (const [id, variable] of Object.entries(existingVariables)) {
    const variableData = variable as Record<string, unknown>;
    existingVarMap.set(variableData['name'] as string, id);
  }

  // Track variables that need mode values set
  const variablesNeedingValues: Array<{ id: string; variable: IFigmaVariable }> = [];

  for (const variable of variables) {
    const existingId = existingVarMap.get(variable.name);

    if (existingId) {
      payload.variables!.push({
        action: 'UPDATE',
        id: existingId,
        name: variable.name,
        resolvedType: variable.type,
      });
      variablesNeedingValues.push({ id: existingId, variable });
      updated++;
    } else {
      // Use crypto.randomUUID() for thread-safe unique ID generation
      const temporaryVariableId = generateTempVariableId();
      payload.variables!.push({
        action: 'CREATE',
        id: temporaryVariableId,
        name: variable.name,
        variableCollectionId: targetCollectionId,
        resolvedType: variable.type,
      });
      variablesNeedingValues.push({ id: temporaryVariableId, variable });
      created++;
    }
  }

  // Set mode values for all variables (both new and updated)
  if (targetModeId) {
    for (const { id, variable } of variablesNeedingValues) {
      let value: unknown = variable.value;
      if (variable.type === 'COLOR' && typeof variable.value === 'string') {
        value = hexToFigmaColor(variable.value);
      }
      payload.variableModeValues!.push({
        variableId: id,
        modeId: targetModeId,
        value,
      });
    }
  }

  await figmaFetch(`/files/${fileKey}/variables`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // If we created a new collection and have variables needing values, make a second POST
  if (isNewCollection && variablesNeedingValues.length > 0) {
    // Wait for Figma API to propagate the new collection (retry with exponential backoff)
    let newModeId: string | undefined;
    let updatedVariablesResponse: FigmaVariablesResponse | undefined;
    let attempt = 0;
    const startTime = Date.now();

    while (attempt < MAX_RETRIES && !newModeId) {
      // Check overall timeout before starting
      if (Date.now() - startTime > OVERALL_RETRY_TIMEOUT_MS) {
        throw new Error(
          `Timeout: Failed to retrieve mode ID for collection "${collectionName}" after ${OVERALL_RETRY_TIMEOUT_MS}ms. ` +
            `The collection was created but variable values could not be set.`
        );
      }

      if (attempt > 0) {
        // Exponential backoff with cap: 500ms, 1000ms, 2000ms (capped at 5000ms)
        const delay = Math.min(RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1), MAX_RETRY_DELAY_MS);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      try {
        // Fetch the newly created collection to get its mode ID
        updatedVariablesResponse = await getVariables(fileKey);

        // Check timeout after API call as well
        if (Date.now() - startTime > OVERALL_RETRY_TIMEOUT_MS) {
          throw new Error(
            `Timeout: Failed to retrieve mode ID for collection "${collectionName}" after ${OVERALL_RETRY_TIMEOUT_MS}ms. ` +
              `The collection was created but variable values could not be set.`
          );
        }

        const collections = updatedVariablesResponse.meta?.variableCollections ?? {};

        for (const [, collection] of Object.entries(collections)) {
          if ((collection as Record<string, unknown>)['name'] === collectionName) {
            const modes = (collection as Record<string, unknown>)['modes'] as Array<{ modeId: string }> | undefined;
            if (modes?.[0]) {
              newModeId = modes[0].modeId;
            }
            break;
          }
        }
      } catch (error) {
        // If fetch fails, retry
        logger.warn({ error, attempt: attempt + 1, maxRetries: MAX_RETRIES }, 'Retry failed to fetch variables');
      }

      attempt++;
    }

    if (!newModeId) {
      throw new Error(
        `Failed to retrieve mode ID for collection "${collectionName}" after ${MAX_RETRIES} retries. ` +
          `The collection was created but variable values could not be set. Please try again or check Figma file manually.`
      );
    }

    if (newModeId && updatedVariablesResponse) {
      // Get the real variable IDs from the response
      const newVariables = updatedVariablesResponse.meta?.variables ?? {};
      const nameToIdMap = new Map<string, string>();
      for (const [id, variable] of Object.entries(newVariables)) {
        const variableData = variable as Record<string, unknown>;
        nameToIdMap.set(variableData['name'] as string, id);
      }

      // Build a second payload with just mode values
      const valuePatch: PostVariablesPayload = {
        variableModeValues: [],
      };

      for (const { variable } of variablesNeedingValues) {
        const realId = nameToIdMap.get(variable.name);
        if (realId) {
          let value: unknown = variable.value;
          if (variable.type === 'COLOR' && typeof variable.value === 'string') {
            value = hexToFigmaColor(variable.value);
          }
          valuePatch.variableModeValues!.push({
            variableId: realId,
            modeId: newModeId,
            value,
          });
        }
      }

      // POST the values
      await figmaFetch(`/files/${fileKey}/variables`, {
        method: 'POST',
        body: JSON.stringify(valuePatch),
      });
    }
  }

  return {
    created,
    updated,
    collections: [collectionName],
  };
}

function hexToFigmaColor(hex: string): { r: number; g: number; b: number; a: number } {
  let clean = hex.replace('#', '');

  // Validate hex format (3, 4, 6, or 8 characters ONLY)
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(clean)) {
    throw new Error(`Invalid hex color format: ${hex}. Expected format: #RGB, #RGBA, #RRGGBB, or #RRGGBBAA`);
  }

  // Normalize 3/4 digit shorthand to 6/8 digit format
  if (clean.length === 3) {
    // #RGB -> #RRGGBB
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  } else if (clean.length === 4) {
    // #RGBA -> #RRGGBBAA
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2] + clean[3] + clean[3];
  }

  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const a = clean.length === 8 ? parseInt(clean.substring(6, 8), 16) / 255 : 1;

  // Validate parsed values are valid numbers (defensive programming)
  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    throw new Error(`Failed to parse hex color: ${hex}. Parsed values: r=${r}, g=${g}, b=${b}, a=${a}`);
  }

  return { r, g, b, a };
}

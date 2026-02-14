import type { IFigmaVariable } from './types.js';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

function getToken(): string {
  const token = process.env['FIGMA_ACCESS_TOKEN'];
  if (!token) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is not set');
  }
  return token;
}

async function figmaFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const token = getToken();
  const response = await fetch(`${FIGMA_API_BASE}${path}`, {
    ...options,
    headers: {
      'X-Figma-Token': token,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Figma API ${response.status}: ${body}`);
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

export async function getFile(fileKey: string): Promise<FigmaFileResponse> {
  return figmaFetch(`/files/${fileKey}`) as Promise<FigmaFileResponse>;
}

export async function getFileNodes(
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

export async function getVariables(fileKey: string): Promise<FigmaVariablesResponse> {
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

export async function postVariables(
  fileKey: string,
  variables: IFigmaVariable[],
  collectionName: string = 'UIForge Tokens'
): Promise<{ created: number; updated: number; collections: string[] }> {
  // First, get existing variables to check for updates
  let existingVars: FigmaVariablesResponse | null = null;
  try {
    existingVars = await getVariables(fileKey);
  } catch {
    // File may not have variables yet
  }

  const existingCollections = existingVars?.meta?.variableCollections ?? {};
  const existingVariables = existingVars?.meta?.variables ?? {};

  let targetCollectionId: string | undefined;
  let targetModeId: string | undefined;

  // Find existing collection
  for (const [id, col] of Object.entries(existingCollections)) {
    if ((col as Record<string, unknown>)['name'] === collectionName) {
      targetCollectionId = id;
      const modes = (col as Record<string, unknown>)['modes'] as Array<{ modeId: string }> | undefined;
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
    const tempId = `temp_collection_${Date.now()}`;
    payload.variableCollections!.push({
      action: 'CREATE',
      id: tempId,
      name: collectionName,
    });
    targetCollectionId = tempId;
    // targetModeId will be determined after POST for new collections
  }

  let created = 0;
  let updated = 0;

  // Map existing variable names to IDs
  const existingVarMap = new Map<string, string>();
  for (const [id, v] of Object.entries(existingVariables)) {
    const varObj = v as Record<string, unknown>;
    existingVarMap.set(varObj['name'] as string, id);
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
      const tempVarId = `temp_var_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      payload.variables!.push({
        action: 'CREATE',
        id: tempVarId,
        name: variable.name,
        variableCollectionId: targetCollectionId,
        resolvedType: variable.type,
      });
      variablesNeedingValues.push({ id: tempVarId, variable });
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
    // Fetch the newly created collection to get its mode ID
    const updatedVars = await getVariables(fileKey);
    const collections = updatedVars.meta?.variableCollections ?? {};

    let newModeId: string | undefined;
    for (const [, col] of Object.entries(collections)) {
      if ((col as Record<string, unknown>)['name'] === collectionName) {
        const modes = (col as Record<string, unknown>)['modes'] as Array<{ modeId: string }> | undefined;
        if (modes?.[0]) {
          newModeId = modes[0].modeId;
        }
        break;
      }
    }

    if (newModeId) {
      // Get the real variable IDs from the response
      const newVariables = updatedVars.meta?.variables ?? {};
      const nameToIdMap = new Map<string, string>();
      for (const [id, v] of Object.entries(newVariables)) {
        const varObj = v as Record<string, unknown>;
        nameToIdMap.set(varObj['name'] as string, id);
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
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const a = clean.length === 8 ? parseInt(clean.substring(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

import { registerBackendSnippets } from '../index.js';
import { inputSanitizationSnippets } from './input-sanitization.js';
import { secretsManagementSnippets } from './secrets-management.js';

export function registerSecurity(): void {
  registerBackendSnippets(inputSanitizationSnippets);
  registerBackendSnippets(secretsManagementSnippets);
}

export { inputSanitizationSnippets, secretsManagementSnippets };

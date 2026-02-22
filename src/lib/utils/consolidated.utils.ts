/**
 * Consolidated utility functions for UIForge MCP
 * Removes duplication and provides a clean, organized interface
 */

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Convert string to PascalCase (e.g., "button" → "Button", "nav-bar" → "NavBar")
 */
export function toPascalCase(str: string): string {
  // If the entire string is already UPPER_CASE (with optional underscores), preserve it as-is
  if (/^[A-Z][A-Z0-9_]*$/.test(str)) return str;
  // Insert separator before uppercase letters in camelCase input, then split
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .split(/[-_\s]+/)
    .map((word) => {
      if (!word) return '';
      // Preserve all-uppercase acronyms within a mixed string
      if (word === word.toUpperCase() && word.length > 1) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Convert string to kebab-case (e.g., "NavBar" → "nav-bar", "Button" → "button")
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // e.g. XMLHttp → XML-Http
    .replace(/([a-z])([A-Z])/g, '$1-$2') // e.g. navBar → nav-Bar
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to camelCase (e.g., "nav-bar" → "navBar", "Button" → "button")
 */
export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Convert string to snake_case (e.g., "NavBar" → "nav_bar", "button" → "button")
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Simple pluralization for common English words
 */
export function pluralize(str: string): string {
  if (str.endsWith('y')) {
    // Only replace y→ies if preceded by a consonant
    if (str.length > 1) {
      const charBeforeY = str.charAt(str.length - 2).toLowerCase();
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      if (!vowels.includes(charBeforeY)) {
        return `${str.slice(0, -1)}ies`;
      }
    }
  }
  if (str.endsWith('s') || str.endsWith('x') || str.endsWith('ch') || str.endsWith('sh')) {
    return `${str}es`;
  }
  return `${str}s`;
}

/**
 * Sanitize string for CSS class names
 */
export function sanitizeClassName(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9-_\s]/g, '') // Remove invalid characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/^[^a-zA-Z_]/, '_') // Ensure it starts with letter or underscore
    .toLowerCase();
}

/**
 * Generate random ID with optional prefix
 */
export function generateRandomId(prefix: string = 'id'): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${randomStr}`;
}

/**
 * Truncate string to specified length with ellipsis
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, (match) => htmlEscapes[match] || '');
}

// ============================================================================
// JSX/FRAMEWORK CONVERSION UTILITIES
// ============================================================================

/**
 * Convert JSX attributes to HTML attributes
 */
export function jsxToHtmlAttributes(jsxCode: string): string {
  return (
    jsxCode
      .replace(/className=/g, 'class=')
      .replace(/htmlFor=/g, 'for=')
      .replace(/tabIndex=/g, 'tabindex=')
      .replace(/readOnly=/g, 'readonly=')
      .replace(/maxLength=/g, 'maxlength=')
      .replace(/minLength=/g, 'minlength=')
      .replace(/autoComplete=/g, 'autocomplete=')
      .replace(/autoFocus=/g, 'autofocus=')
      .replace(/spellCheck=/g, 'spellcheck=')
      .replace(/contentEditable=/g, 'contenteditable=')
      .replace(/strokeWidth=/g, 'stroke-width=')
      .replace(/strokeLinecap=/g, 'stroke-linecap=')
      .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
      .replace(/defaultValue=/g, 'value=')
      .replace(/defaultChecked=/g, 'checked=')
      // Convert camelCase data attributes to kebab-case
      .replace(/data-([a-z])([A-Z])/g, (match, p1, p2) => `data-${p1}-${p2.toLowerCase()}`)
      // Convert camelCase aria attributes to lowercase
      .replace(/aria-([a-zA-Z]+)/g, (match, p1) => `aria-${p1.toLowerCase()}`)
      // Handle boolean attributes
      .replace(
        /\s+(disabled|required|readonly|checked|selected|autofocus|autoplay|controls|loop|muted|hidden|multiple|defer|async|novalidate|open|reversed|inert|itemscope)=\{(true|false)\}/g,
        (match, attr, value) => (value === 'true' ? ` ${attr}` : '')
      )
      // Handle boolean JSX expressions
      .replace(/=(\{true\})/g, '="true"')
      .replace(/=(\{false\})/g, '="false"')
  );
}

/**
 * Convert React event handlers to HTML event attributes
 */
export function reactEventsToHtml(jsxCode: string): string {
  const eventMap: Record<string, string> = {
    onClick: 'onclick',
    onChange: 'onchange',
    onSubmit: 'onsubmit',
    onFocus: 'onfocus',
    onBlur: 'onblur',
    onKeyDown: 'onkeydown',
    onKeyUp: 'onkeyup',
    onKeyPress: 'onkeypress',
    onMouseEnter: 'onmouseenter',
    onMouseLeave: 'onmouseleave',
    onMouseDown: 'onmousedown',
    onMouseUp: 'onmouseup',
    onInput: 'oninput',
  };

  let result = jsxCode;
  Object.entries(eventMap).forEach(([react, html]) => {
    result = result.replace(new RegExp(react, 'g'), html);
  });
  return result;
}

/**
 * Convert React event handlers to Svelte event syntax
 */
export function reactEventsToSvelte(jsxCode: string): string {
  const eventMap: Record<string, string> = {
    onClick: 'on:click',
    onChange: 'on:change',
    onSubmit: 'on:submit',
    onFocus: 'on:focus',
    onBlur: 'on:blur',
    onKeyDown: 'on:keydown',
    onKeyUp: 'on:keyup',
    onKeyPress: 'on:keypress',
    onMouseEnter: 'on:mouseenter',
    onMouseLeave: 'on:mouseleave',
    onMouseDown: 'on:mousedown',
    onMouseUp: 'on:mouseup',
    onInput: 'on:input',
  };

  let result = jsxCode;
  Object.entries(eventMap).forEach(([react, svelte]) => {
    result = result.replace(new RegExp(react, 'g'), svelte);
  });
  return result;
}

/**
 * Remove JSX-specific syntax
 */
export function cleanJsxSyntax(jsxCode: string): string {
  return jsxCode
    .replace(/<>\s*/g, '')
    .replace(/\s*<\/>/g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ''); // Remove JSX comments
}

/**
 * Full JSX to HTML conversion
 */
export function jsxToHtml(jsxCode: string): string {
  let result = jsxCode;
  result = jsxToHtmlAttributes(result);
  result = reactEventsToHtml(result);
  result = cleanJsxSyntax(result);
  return result;
}

/**
 * Full JSX to Svelte conversion
 */
export function jsxToSvelte(jsxCode: string): string {
  let result = jsxCode;
  result = jsxToHtmlAttributes(result);
  result = reactEventsToSvelte(result);
  result = cleanJsxSyntax(result);
  return result;
}

/**
 * Convert HTML attributes object to JSX attributes string
 */
export function htmlToJsxAttributes(attributes: Record<string, string>): string {
  const attributeMap: Record<string, string> = {
    class: 'className',
    for: 'htmlFor',
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    maxlength: 'maxLength',
    minlength: 'minLength',
    autocomplete: 'autoComplete',
    autofocus: 'autoFocus',
    spellcheck: 'spellCheck',
    contenteditable: 'contentEditable',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
  };

  return Object.entries(attributes)
    .map(([key, value]) => {
      // Convert HTML attributes back to JSX
      const jsxKey = attributeMap[key] || key;
      return `${jsxKey}="${value}"`;
    })
    .join(' ');
}

// ============================================================================
// STYLE UTILITIES
// ============================================================================

/**
 * Convert style object to CSS string
 */
export function convertStyleObjectToString(styleObject: Record<string, string | number>): string {
  return Object.entries(styleObject)
    .map(([property, value]) => {
      // Convert camelCase to kebab-case
      const cssProperty = property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      // Add px unit for numeric values
      const cssValue = typeof value === 'number' ? `${value}px` : value;
      return `${cssProperty}: ${cssValue}`;
    })
    .join('; ');
}

/**
 * Parse CSS style string to object
 */
export function parseStyleString(styleString: string): Record<string, string> {
  const styles: Record<string, string> = {};

  if (!styleString) return styles;

  styleString.split(';').forEach((rule) => {
    const [property, value] = rule.split(':').map((s) => s.trim());
    if (property && value) {
      styles[property] = value;
    }
  });

  return styles;
}

/**
 * Merge multiple style objects
 */
export function mergeStyles(
  ...styles: (Record<string, string | number> | undefined)[]
): Record<string, string | number> {
  return styles.reduce(
    (merged: Record<string, string | number>, style) => {
      if (style) {
        return { ...merged, ...style };
      }
      return merged;
    },
    {} as Record<string, string | number>
  );
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate hex color format
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * Validate component name (kebab-case)
 */
export function isValidComponentName(name: string): boolean {
  const nameRegex = /^[a-z][a-zA-Z0-9-_]*$/;
  return nameRegex.test(name);
}

/**
 * Validate project name
 */
export function isValidProjectName(name: string): boolean {
  const nameRegex = /^[a-zA-Z0-9-_]+$/;
  return nameRegex.test(name) && name.length > 0;
}

// ============================================================================
// FILE SYSTEM UTILITIES
// ============================================================================

/**
 * Get file extension from path
 */
export function getFileExtension(path: string): string {
  const parts = path.split('.');
  // Return empty string if there's no extension (no dot or only one part)
  if (parts.length <= 1) return '';
  return parts.pop() || '';
}

/**
 * Get filename without extension
 */
export function getFileName(path: string): string {
  const nameWithExt = path.split('/').pop() || '';
  return nameWithExt.split('.')[0] || '';
}

/**
 * Convert file path to different framework conventions
 */
export function convertPathForFramework(path: string, framework: string): string {
  const fileName = getFileName(path);
  const extension = getFileExtension(path);

  switch (framework) {
    case 'react':
    case 'nextjs':
      return `${fileName}.tsx`;
    case 'vue':
      return `${fileName}.vue`;
    case 'svelte':
      return `${fileName}.svelte`;
    case 'angular':
      return `${fileName}.component.ts`;
    case 'html':
      return `${fileName}.html`;
    default:
      return path;
  }
}

// ============================================================================
// COLLECTION UTILITIES
// ============================================================================

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Group array items by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      groups[groupKey] = groups[groupKey] || [];
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Sort array of objects by key
 */
export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Check if array includes value (case-insensitive for strings)
 */
export function includesCaseInsensitive<T>(array: T[], value: T): boolean {
  if (typeof value !== 'string') return array.includes(value);

  return array.some((item) => typeof item === 'string' && item.toLowerCase() === value.toLowerCase());
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard for strings
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Type guard for numbers
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Type guard for objects
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Type guard for arrays
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Type guard for functions
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

/**
 * Create standardized error object
 */
export function createError(message: string, code?: string, details?: Record<string, unknown>) {
  return {
    message,
    code,
    details,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('ENOTFOUND'))
  );
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(fn: () => Promise<T>, maxAttempts: number = 3, delay: number = 1000): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}

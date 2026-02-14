/**
 * String utility functions for component generation
 */

export function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => {
      // Preserve all-uppercase acronyms
      if (word === word.toUpperCase() && word.length > 1) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

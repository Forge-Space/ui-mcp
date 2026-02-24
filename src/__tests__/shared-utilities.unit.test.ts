import { describe, it, expect } from '@jest/globals';
import {
  toPascalCase,
  toKebabCase,
  toCamelCase,
  toSnakeCase,
  capitalize,
  pluralize,
  sanitizeClassName,
  generateRandomId,
  truncate,
  escapeHtml,
  jsxToHtml,
  jsxToSvelte,
  htmlToJsxAttributes,
  convertStyleObjectToString,
  parseStyleString,
  mergeStyles,
  isValidEmail,
  isValidUrl,
  isValidHexColor,
  isValidComponentName,
  isValidProjectName,
  getFileExtension,
  getFileName,
  convertPathForFramework,
  unique,
  groupBy,
  sortBy,
  includesCaseInsensitive,
  isString,
  isNumber,
  isObject,
  isArray,
  isFunction,
} from '../lib/utils/consolidated.utils.js';

describe('Shared Utilities', () => {
  describe('String Case Conversion', () => {
    it('should convert to PascalCase', () => {
      expect(toPascalCase('button')).toBe('Button');
      expect(toPascalCase('nav-bar')).toBe('NavBar');
      expect(toPascalCase('user_profile')).toBe('UserProfile');
      expect(toPascalCase('API_KEY')).toBe('API_KEY');
      expect(toPascalCase('xmlHttpRequest')).toBe('XmlHttpRequest');
    });

    it('should convert to kebab-case', () => {
      expect(toKebabCase('NavBar')).toBe('nav-bar');
      expect(toKebabCase('Button')).toBe('button');
      expect(toKebabCase('UserProfile')).toBe('user-profile');
      expect(toKebabCase('XMLHttpRequest')).toBe('xml-http-request');
    });

    it('should convert to camelCase', () => {
      expect(toCamelCase('nav-bar')).toBe('navBar');
      expect(toCamelCase('Button')).toBe('button');
      expect(toCamelCase('user_profile')).toBe('userProfile');
    });

    it('should convert to snake_case', () => {
      expect(toSnakeCase('NavBar')).toBe('nav_bar');
      expect(toSnakeCase('Button')).toBe('button');
      expect(toSnakeCase('UserProfile')).toBe('user_profile');
    });

    it('should capitalize strings', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('Hello');
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('should pluralize words', () => {
      expect(pluralize('cat')).toBe('cats');
      expect(pluralize('dog')).toBe('dogs');
      expect(pluralize('city')).toBe('cities');
      expect(pluralize('box')).toBe('boxes');
    });
  });

  describe('Validation Functions', () => {
    it('should validate email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });

    it('should validate URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('ftp://files.example.com')).toBe(true);
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
    });

    it('should validate hex colors', () => {
      expect(isValidHexColor('#ffffff')).toBe(true);
      expect(isValidHexColor('#000000')).toBe(true);
      expect(isValidHexColor('#3b82f6')).toBe(true);
      expect(isValidHexColor('ffffff')).toBe(false);
      expect(isValidHexColor('#gggggg')).toBe(false);
      expect(isValidHexColor('#123')).toBe(true);
    });

    it('should validate component names', () => {
      expect(isValidComponentName('button')).toBe(true);
      expect(isValidComponentName('nav-bar')).toBe(true);
      expect(isValidComponentName('user_profile')).toBe(true);
      expect(isValidComponentName('Button')).toBe(false);
      expect(isValidComponentName('123button')).toBe(false);
      expect(isValidComponentName('button!')).toBe(false);
    });

    it('should validate project names', () => {
      expect(isValidProjectName('my-project')).toBe(true);
      expect(isValidProjectName('my_project')).toBe(true);
      expect(isValidProjectName('MyProject')).toBe(true);
      expect(isValidProjectName('my project')).toBe(false);
      expect(isValidProjectName('')).toBe(false);
    });
  });

  describe('String Utilities', () => {
    it('should sanitize class names', () => {
      expect(sanitizeClassName('hello world')).toBe('hello-world');
      expect(sanitizeClassName('button@primary')).toBe('buttonprimary');
      expect(sanitizeClassName('nav#bar')).toBe('navbar');
    });

    it('should generate random IDs', () => {
      const id1 = generateRandomId();
      const id2 = generateRandomId();

      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^id_[a-z0-9]+_[a-z0-9]+$/);
    });

    it('should truncate strings', () => {
      expect(truncate('Hello world', 5)).toBe('He...');
      expect(truncate('Hello', 10)).toBe('Hello');
      expect(truncate('Hello world', 12)).toBe('Hello world');
    });

    it('should escape HTML', () => {
      expect(escapeHtml('<div>Hello & world</div>')).toBe('&lt;div&gt;Hello &amp; world&lt;/div&gt;');
      expect(escapeHtml('script>alert("xss")')).toBe('script&gt;alert(&quot;xss&quot;)');
    });
  });

  describe('JSX/HTML Conversion', () => {
    it('should convert JSX to HTML', () => {
      const jsx = '<div className="container" onClick={handleClick}>Hello</div>';
      const html = jsxToHtml(jsx);

      expect(html).toContain('class="container"');
      expect(html).toContain('onclick=');
    });

    it('should convert JSX to Svelte', () => {
      const jsx = '<div className="container" onClick={handleClick}>Hello</div>';
      const svelte = jsxToSvelte(jsx);

      expect(svelte).toContain('class="container"');
      expect(svelte).toContain('on:click=');
    });

    it('should convert HTML attributes to JSX', () => {
      const attrs = { class: 'container', for: 'input', readonly: true };
      const jsx = htmlToJsxAttributes(attrs);

      expect(jsx).toContain('className=');
      expect(jsx).toContain('htmlFor=');
    });
  });

  describe('Style Utilities', () => {
    it('should convert style object to string', () => {
      const style = {
        backgroundColor: '#ffffff',
        fontSize: '16px',
        marginTop: 10,
      };

      const css = convertStyleObjectToString(style);
      expect(css).toContain('background-color: #ffffff');
      expect(css).toContain('font-size: 16px');
      expect(css).toContain('margin-top: 10px');
    });

    it('should parse style string to object', () => {
      const css = 'background-color: #ffffff; font-size: 16px; margin-top: 10px';
      const style = parseStyleString(css);

      expect(style).toEqual({
        'background-color': '#ffffff',
        'font-size': '16px',
        'margin-top': '10px',
      });
    });

    it('should merge styles', () => {
      const style1 = { color: 'red', fontSize: '14px' };
      const style2 = { backgroundColor: 'blue', fontSize: '16px' };

      const merged = mergeStyles(style1, style2);
      expect(merged).toEqual({
        color: 'red',
        backgroundColor: 'blue',
        fontSize: '16px',
      });
    });
  });

  describe('File Utilities', () => {
    it('should get file extension', () => {
      expect(getFileExtension('component.tsx')).toBe('tsx');
      expect(getFileExtension('style.css')).toBe('css');
      expect(getFileExtension('script')).toBe('');
    });

    it('should get filename without extension', () => {
      expect(getFileName('component.tsx')).toBe('component');
      expect(getFileName('src/components/Button.tsx')).toBe('Button');
      expect(getFileName('path/to/file')).toBe('file');
    });

    it('should convert paths for different frameworks', () => {
      expect(convertPathForFramework('components/Button.tsx', 'react')).toBe('Button.tsx');
      expect(convertPathForFramework('components/Button.vue', 'vue')).toBe('Button.vue');
      expect(convertPathForFramework('components/Button.svelte', 'svelte')).toBe('Button.svelte');
    });
  });

  describe('Array Utilities', () => {
    it('should remove duplicates', () => {
      expect(unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should group arrays', () => {
      const data = [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' },
        { type: 'vegetable', name: 'carrot' },
      ];

      const grouped = groupBy(data, 'type');
      expect(grouped.fruit).toHaveLength(2);
      expect(grouped.vegetable).toHaveLength(1);
    });

    it('should sort arrays', () => {
      const data = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 },
      ];

      const sorted = sortBy(data, 'name');
      expect(sorted[0].name).toBe('Alice');
      expect(sorted[1].name).toBe('Bob');
      expect(sorted[2].name).toBe('Charlie');

      const sortedDesc = sortBy(data, 'age', 'desc');
      expect(sortedDesc[0].age).toBe(35);
      expect(sortedDesc[2].age).toBe(25);
    });

    it('should check case-insensitive includes', () => {
      expect(includesCaseInsensitive(['Hello', 'World'], 'hello')).toBe(true);
      expect(includesCaseInsensitive(['Hello', 'World'], 'WORLD')).toBe(true);
      expect(includesCaseInsensitive(['Hello', 'World'], 'test')).toBe(false);
      expect(includesCaseInsensitive([1, 2, 3], 2)).toBe(true);
    });
  });

  describe('Type Guards', () => {
    it('should identify string values', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(null)).toBe(false);
    });

    it('should identify number values', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-45)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
      expect(isNumber('123')).toBe(false);
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber({})).toBe(false);
    });

    it('should identify object values', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: 'value' })).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject('string')).toBe(false);
      expect(isObject(123)).toBe(false);
    });

    it('should identify array values', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray({})).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray('string')).toBe(false);
    });

    it('should identify function values', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction({})).toBe(false);
      expect(isFunction('string')).toBe(false);
      expect(isFunction(123)).toBe(false);
    });
  });
});

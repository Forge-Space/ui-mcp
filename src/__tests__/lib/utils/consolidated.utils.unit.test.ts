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
  jsxToHtmlAttributes,
  reactEventsToHtml,
  reactEventsToSvelte,
  cleanJsxSyntax,
  jsxToHtml,
  jsxToSvelte,
  htmlToJsxAttributes,
  convertStyleObjectToString,
} from '../../../lib/utils/consolidated.utils.js';

describe('consolidated.utils', () => {
  describe('toPascalCase', () => {
    it('converts simple words', () => {
      expect(toPascalCase('button')).toBe('Button');
      expect(toPascalCase('input')).toBe('Input');
    });

    it('handles hyphenated strings', () => {
      expect(toPascalCase('nav-bar')).toBe('NavBar');
      expect(toPascalCase('user-profile')).toBe('UserProfile');
    });

    it('preserves uppercase acronyms', () => {
      expect(toPascalCase('API_KEY')).toBe('API_KEY');
      expect(toPascalCase('HTTP_REQUEST')).toBe('HTTP_REQUEST');
    });

    it('handles mixed case input', () => {
      expect(toPascalCase('navBar')).toBe('NavBar');
      expect(toPascalCase('myComponent')).toBe('MyComponent');
    });
  });

  describe('toKebabCase', () => {
    it('converts PascalCase', () => {
      expect(toKebabCase('NavBar')).toBe('nav-bar');
      expect(toKebabCase('UserProfile')).toBe('user-profile');
    });

    it('handles uppercase acronyms', () => {
      expect(toKebabCase('XMLHttpRequest')).toBe('xml-http-request');
    });

    it('handles already kebab-case', () => {
      expect(toKebabCase('nav-bar')).toBe('nav-bar');
    });
  });

  describe('toCamelCase', () => {
    it('converts kebab-case', () => {
      expect(toCamelCase('nav-bar')).toBe('navBar');
      expect(toCamelCase('user-profile')).toBe('userProfile');
    });

    it('converts PascalCase', () => {
      expect(toCamelCase('NavBar')).toBe('navBar');
    });
  });

  describe('toSnakeCase', () => {
    it('converts PascalCase', () => {
      expect(toSnakeCase('NavBar')).toBe('nav_bar');
    });

    it('handles spaces', () => {
      expect(toSnakeCase('nav bar')).toBe('nav_bar');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('button')).toBe('Button');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles already capitalized', () => {
      expect(capitalize('Button')).toBe('Button');
    });
  });

  describe('pluralize', () => {
    it('adds s to regular words', () => {
      expect(pluralize('button')).toBe('buttons');
    });

    it('converts y to ies after consonant', () => {
      expect(pluralize('category')).toBe('categories');
    });

    it('keeps y after vowel', () => {
      expect(pluralize('key')).toBe('keys');
    });

    it('adds es to s/x/ch/sh endings', () => {
      expect(pluralize('class')).toBe('classes');
      expect(pluralize('box')).toBe('boxes');
      expect(pluralize('church')).toBe('churches');
      expect(pluralize('brush')).toBe('brushes');
    });
  });

  describe('sanitizeClassName', () => {
    it('removes invalid characters', () => {
      expect(sanitizeClassName('button!')).toBe('button');
      expect(sanitizeClassName('my@class')).toBe('myclass');
    });

    it('converts spaces to hyphens', () => {
      expect(sanitizeClassName('my class')).toBe('my-class');
    });

    it('ensures starts with letter or underscore', () => {
      expect(sanitizeClassName('123class')).toBe('_23class');
    });
  });

  describe('generateRandomId', () => {
    it('generates ID with default prefix', () => {
      const id = generateRandomId();
      expect(id).toMatch(/^id_/);
    });

    it('generates ID with custom prefix', () => {
      const id = generateRandomId('button');
      expect(id).toMatch(/^button_/);
    });

    it('generates unique IDs', () => {
      const id1 = generateRandomId();
      const id2 = generateRandomId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });

    it('does not truncate short strings', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('uses custom suffix', () => {
      expect(truncate('hello world', 8, '---')).toBe('hello---');
    });
  });

  describe('escapeHtml', () => {
    it('escapes HTML special characters', () => {
      expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
      expect(escapeHtml('a & b')).toBe('a &amp; b');
      expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;');
      expect(escapeHtml("'single'")).toBe('&#39;single&#39;');
    });
  });

  describe('jsxToHtmlAttributes', () => {
    it('converts className to class', () => {
      expect(jsxToHtmlAttributes('className="btn"')).toContain('class="btn"');
    });

    it('converts htmlFor to for', () => {
      expect(jsxToHtmlAttributes('htmlFor="input"')).toContain('for="input"');
    });

    it('converts tabIndex to tabindex', () => {
      expect(jsxToHtmlAttributes('tabIndex="0"')).toContain('tabindex="0"');
    });

    it('converts readOnly to readonly', () => {
      expect(jsxToHtmlAttributes('readOnly="true"')).toContain('readonly="true"');
    });

    it('converts maxLength to maxlength', () => {
      expect(jsxToHtmlAttributes('maxLength="10"')).toContain('maxlength="10"');
    });

    it('converts autoComplete to autocomplete', () => {
      expect(jsxToHtmlAttributes('autoComplete="off"')).toContain('autocomplete="off"');
    });

    it('converts strokeWidth to stroke-width', () => {
      expect(jsxToHtmlAttributes('strokeWidth="2"')).toContain('stroke-width="2"');
    });

    it('handles boolean attributes', () => {
      const result = jsxToHtmlAttributes('disabled={true}');
      expect(result).toContain('disabled');
    });
  });

  describe('reactEventsToHtml', () => {
    it('converts onClick to onclick', () => {
      expect(reactEventsToHtml('onClick={handler}')).toContain('onclick={handler}');
    });

    it('converts onChange to onchange', () => {
      expect(reactEventsToHtml('onChange={handler}')).toContain('onchange={handler}');
    });

    it('converts onSubmit to onsubmit', () => {
      expect(reactEventsToHtml('onSubmit={handler}')).toContain('onsubmit={handler}');
    });

    it('converts onMouseEnter to onmouseenter', () => {
      expect(reactEventsToHtml('onMouseEnter={handler}')).toContain('onmouseenter={handler}');
    });
  });

  describe('reactEventsToSvelte', () => {
    it('converts onClick to on:click', () => {
      expect(reactEventsToSvelte('onClick={handler}')).toContain('on:click={handler}');
    });

    it('converts onChange to on:change', () => {
      expect(reactEventsToSvelte('onChange={handler}')).toContain('on:change={handler}');
    });

    it('converts onSubmit to on:submit', () => {
      expect(reactEventsToSvelte('onSubmit={handler}')).toContain('on:submit={handler}');
    });
  });

  describe('cleanJsxSyntax', () => {
    it('removes JSX fragments', () => {
      expect(cleanJsxSyntax('<><div></div></>')).toBe('<div></div>');
    });

    it('removes JSX comments', () => {
      expect(cleanJsxSyntax('{/* comment */}text')).toBe('text');
    });
  });

  describe('jsxToHtml', () => {
    it('performs full JSX to HTML conversion', () => {
      const jsx = '<div className="btn" onClick={handler}>Click</div>';
      const html = jsxToHtml(jsx);
      expect(html).toContain('class=');
      expect(html).toContain('onclick=');
    });
  });

  describe('jsxToSvelte', () => {
    it('performs full JSX to Svelte conversion', () => {
      const jsx = '<div className="btn" onClick={handler}>Click</div>';
      const svelte = jsxToSvelte(jsx);
      expect(svelte).toContain('class=');
      expect(svelte).toContain('on:click=');
    });
  });

  describe('htmlToJsxAttributes', () => {
    it('converts class to className', () => {
      const result = htmlToJsxAttributes({ class: 'btn' });
      expect(result).toContain('className="btn"');
    });

    it('converts for to htmlFor', () => {
      const result = htmlToJsxAttributes({ for: 'input' });
      expect(result).toContain('htmlFor="input"');
    });

    it('converts multiple attributes', () => {
      const result = htmlToJsxAttributes({ class: 'btn', for: 'input', tabindex: '0' });
      expect(result).toContain('className=');
      expect(result).toContain('htmlFor=');
      expect(result).toContain('tabIndex=');
    });
  });

  describe('convertStyleObjectToString', () => {
    it('converts style object to CSS string', () => {
      const result = convertStyleObjectToString({ color: 'red', fontSize: 16 });
      expect(result).toContain('color: red');
      expect(result).toContain('font-size: 16px');
    });

    it('handles camelCase properties', () => {
      const result = convertStyleObjectToString({ backgroundColor: 'blue' });
      expect(result).toContain('background-color: blue');
    });

    it('adds px to numeric values', () => {
      const result = convertStyleObjectToString({ width: 100 });
      expect(result).toContain('100px');
    });
  });
});

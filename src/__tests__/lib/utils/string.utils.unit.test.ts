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
} from '../../../lib/utils/string.utils.js';

describe('string.utils', () => {
  describe('toPascalCase', () => {
    it('converts simple words to PascalCase', () => {
      expect(toPascalCase('button')).toBe('Button');
      expect(toPascalCase('input')).toBe('Input');
      expect(toPascalCase('form')).toBe('Form');
    });

    it('handles hyphen-separated words', () => {
      expect(toPascalCase('primary-button')).toBe('PrimaryButton');
      expect(toPascalCase('user-input')).toBe('UserInput');
      expect(toPascalCase('form-field')).toBe('FormField');
    });

    it('handles underscore-separated words', () => {
      expect(toPascalCase('primary_button')).toBe('PrimaryButton');
      expect(toPascalCase('user_input')).toBe('UserInput');
      expect(toPascalCase('form_field')).toBe('FormField');
    });

    it('handles space-separated words', () => {
      expect(toPascalCase('primary button')).toBe('PrimaryButton');
      expect(toPascalCase('user input')).toBe('UserInput');
      expect(toPascalCase('form field')).toBe('FormField');
    });

    it('preserves all-uppercase acronyms', () => {
      expect(toPascalCase('API_key')).toBe('APIKey');
      expect(toPascalCase('HTTP_request')).toBe('HTTPRequest');
      expect(toPascalCase('JSON_data')).toBe('JSONData');
    });

    it('handles mixed separators', () => {
      expect(toPascalCase('primary-button_input')).toBe('PrimaryButtonInput');
      expect(toPascalCase('user input-field')).toBe('UserInputField');
    });

    it('handles empty string', () => {
      expect(toPascalCase('')).toBe('');
    });

    it('handles single character', () => {
      expect(toPascalCase('a')).toBe('A');
      expect(toPascalCase('A')).toBe('A');
    });
  });

  describe('toKebabCase', () => {
    it('converts PascalCase to kebab-case', () => {
      expect(toKebabCase('PrimaryButton')).toBe('primary-button');
      expect(toKebabCase('UserInput')).toBe('user-input');
      expect(toKebabCase('FormField')).toBe('form-field');
    });

    it('converts camelCase to kebab-case', () => {
      expect(toKebabCase('primaryButton')).toBe('primary-button');
      expect(toKebabCase('userInput')).toBe('user-input');
      expect(toKebabCase('formField')).toBe('form-field');
    });

    it('handles spaces and underscores', () => {
      expect(toKebabCase('primary button')).toBe('primary-button');
      expect(toKebabCase('primary_button')).toBe('primary-button');
      expect(toKebabCase('primary button_input')).toBe('primary-button-input');
    });

    it('handles multiple consecutive separators', () => {
      expect(toKebabCase('primary  button')).toBe('primary-button');
      expect(toKebabCase('primary__button')).toBe('primary-button');
      expect(toKebabCase('primary  button_input')).toBe('primary-button-input');
    });

    it('handles empty string', () => {
      expect(toKebabCase('')).toBe('');
    });

    it('handles already kebab-case', () => {
      expect(toKebabCase('primary-button')).toBe('primary-button');
      expect(toKebabCase('user-input-field')).toBe('user-input-field');
    });
  });

  describe('toCamelCase', () => {
    it('converts PascalCase to camelCase', () => {
      expect(toCamelCase('PrimaryButton')).toBe('primaryButton');
      expect(toCamelCase('UserInput')).toBe('userInput');
      expect(toCamelCase('FormField')).toBe('formField');
    });

    it('converts kebab-case to camelCase', () => {
      expect(toCamelCase('primary-button')).toBe('primaryButton');
      expect(toCamelCase('user-input')).toBe('userInput');
      expect(toCamelCase('form-field')).toBe('formField');
    });

    it('converts snake_case to camelCase', () => {
      expect(toCamelCase('primary_button')).toBe('primaryButton');
      expect(toCamelCase('user_input')).toBe('userInput');
      expect(toCamelCase('form_field')).toBe('formField');
    });

    it('handles space-separated words', () => {
      expect(toCamelCase('primary button')).toBe('primaryButton');
      expect(toCamelCase('user input')).toBe('userInput');
    });

    it('handles single word', () => {
      expect(toCamelCase('button')).toBe('button');
      expect(toCamelCase('Button')).toBe('button');
    });

    it('handles empty string', () => {
      expect(toCamelCase('')).toBe('');
    });
  });

  describe('toSnakeCase', () => {
    it('converts PascalCase to snake_case', () => {
      expect(toSnakeCase('PrimaryButton')).toBe('primary_button');
      expect(toSnakeCase('UserInput')).toBe('user_input');
      expect(toSnakeCase('FormField')).toBe('form_field');
    });

    it('converts camelCase to snake_case', () => {
      expect(toSnakeCase('primaryButton')).toBe('primary_button');
      expect(toSnakeCase('userInput')).toBe('user_input');
      expect(toSnakeCase('formField')).toBe('form_field');
    });

    it('converts kebab-case to snake_case', () => {
      expect(toSnakeCase('primary-button')).toBe('primary_button');
      expect(toSnakeCase('user-input')).toBe('user_input');
    });

    it('handles spaces and multiple separators', () => {
      expect(toSnakeCase('primary button')).toBe('primary_button');
      expect(toSnakeCase('primary  button')).toBe('primary_button');
      expect(toSnakeCase('primary-button input')).toBe('primary_button_input');
    });

    it('handles empty string', () => {
      expect(toSnakeCase('')).toBe('');
    });
  });

  describe('sanitizeClassName', () => {
    it('removes invalid characters from class names', () => {
      expect(sanitizeClassName('primary-button!')).toBe('primary-button');
      expect(sanitizeClassName('user@input')).toBe('userinput');
      expect(sanitizeClassName('form#field')).toBe('formfield');
    });

    it('handles empty string', () => {
      expect(sanitizeClassName('')).toBe('');
    });

    it('preserves valid characters', () => {
      expect(sanitizeClassName('primary-button')).toBe('primary-button');
      expect(sanitizeClassName('user_input')).toBe('user_input');
      expect(sanitizeClassName('formField')).toBe('formField');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter of string', () => {
      expect(capitalize('button')).toBe('Button');
      expect(capitalize('input')).toBe('Input');
      expect(capitalize('form')).toBe('Form');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('A')).toBe('A');
    });

    it('handles already capitalized strings', () => {
      expect(capitalize('Button')).toBe('Button');
      expect(capitalize('Input')).toBe('Input');
    });
  });

  describe('pluralize', () => {
    it('adds s to regular nouns', () => {
      expect(pluralize('button')).toBe('buttons');
      expect(pluralize('input')).toBe('inputs');
      expect(pluralize('form')).toBe('forms');
    });

    it('converts y to ies for consonant + y', () => {
      expect(pluralize('buttony')).toBe('buttonies');
      expect(pluralize('category')).toBe('categories');
      expect(pluralize('entity')).toBe('entities');
    });

    it('keeps y for vowel + y', () => {
      expect(pluralize('boy')).toBe('boys');
      expect(pluralize('key')).toBe('keys');
      expect(pluralize('day')).toBe('days');
    });

    it('adds es for s, x, ch, sh endings', () => {
      expect(pluralize('class')).toBe('classes');
      expect(pluralize('box')).toBe('boxes');
      expect(pluralize('church')).toBe('churches');
      expect(pluralize('brush')).toBe('brushes');
    });

    it('handles empty string', () => {
      expect(pluralize('')).toBe('s');
    });

    it('handles single character', () => {
      expect(pluralize('a')).toBe('as');
      expect(pluralize('s')).toBe('ses');
    });
  });

  describe('generateRandomId', () => {
    it('generates a random ID with default prefix', () => {
      const id = generateRandomId();
      expect(id).toMatch(/^id_[a-z0-9]+_[a-z0-9]{6}$/);
    });

    it('generates a random ID with custom prefix', () => {
      const id = generateRandomId('button');
      expect(id).toMatch(/^button_[a-z0-9]+_[a-z0-9]{6}$/);
    });

    it('generates different IDs on multiple calls', () => {
      const id1 = generateRandomId();
      const id2 = generateRandomId();
      expect(id1).not.toBe(id2);
    });

    it('handles empty prefix', () => {
      const id = generateRandomId('');
      expect(id).toMatch(/^[a-z0-9]+_[a-z0-9]{6}$/);
    });

    it('generates IDs with reasonable length', () => {
      const id = generateRandomId();
      expect(id.length).toBeGreaterThan(10);
      expect(id.length).toBeLessThan(30);
    });
  });
});

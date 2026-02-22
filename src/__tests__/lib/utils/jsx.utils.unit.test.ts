import { describe, it, expect } from '@jest/globals';
import {
  jsxToHtmlAttributes,
  htmlToJsxAttributes,
  convertStyleObjectToString,
  parseStyleString,
  reactEventsToHtml,
  reactEventsToSvelte,
  cleanJsxSyntax,
  jsxToHtml,
  jsxToSvelte,
} from '../../../lib/utils/jsx.utils.js';

describe('jsx.utils', () => {
  describe('jsxToHtmlAttributes', () => {
    it('converts className to class', () => {
      const jsx = '<div className="container">Content</div>';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<div class="container">Content</div>');
    });

    it('converts htmlFor to for', () => {
      const jsx = '<label htmlFor="input">Label</label>';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<label for="input">Label</label>');
    });

    it('converts tabIndex to tabindex', () => {
      const jsx = '<button tabIndex={0}>Button</button>';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<button tabindex={0}>Button</button>');
    });

    it('converts readOnly to readonly', () => {
      const jsx = '<input readOnly={true} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input readonly={true} />');
    });

    it('converts maxLength to maxlength', () => {
      const jsx = '<input maxLength={50} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input maxlength={50} />');
    });

    it('converts minLength to minlength', () => {
      const jsx = '<input minLength={5} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input minlength={5} />');
    });

    it('converts autoComplete to autocomplete', () => {
      const jsx = '<input autoComplete="on" />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input autocomplete="on" />');
    });

    it('converts autoFocus to autofocus', () => {
      const jsx = '<input autoFocus={true} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input autofocus={true} />');
    });

    it('converts spellCheck to spellcheck', () => {
      const jsx = '<input spellCheck={false} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input spellcheck={false} />');
    });

    it('converts contentEditable to contenteditable', () => {
      const jsx = '<div contentEditable={true}>Editable</div>';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<div contenteditable={true}>Editable</div>');
    });

    it('converts SVG attributes', () => {
      const jsx = '<svg strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<svg stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />');
    });

    it('converts defaultValue to value', () => {
      const jsx = '<input defaultValue="default" />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input value="default" />');
    });

    it('converts defaultChecked to checked', () => {
      const jsx = '<input defaultChecked={true} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input checked={true} />');
    });

    it('converts camelCase data attributes to kebab-case', () => {
      const jsx = '<div dataTestId="test" dataUserId="123">Content</div>';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<div data-test-id="test" data-user-id="123">Content</div>');
    });

    it('converts camelCase aria attributes to lowercase', () => {
      const jsx = '<button ariaLabel="Button" ariaDescribedBy="desc">Button</button>';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<button aria-label="Button" aria-describedby="desc">Button</button>');
    });

    it('handles boolean attributes with true values', () => {
      const jsx = '<input disabled={true} required={true} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input disabled required />');
    });

    it('removes boolean attributes with false values', () => {
      const jsx = '<input disabled={false} required={false} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input  />');
    });

    it('converts JSX boolean expressions', () => {
      const jsx = '<input value={true} checked={false} />';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<input value="true" checked="false" />');
    });

    it('handles multiple attributes in one element', () => {
      const jsx = '<button className="btn" disabled={true} tabIndex={0}>Click</button>';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('<button class="btn" disabled tabindex={0}>Click</button>');
    });

    it('handles empty string', () => {
      const jsx = '';
      const html = jsxToHtmlAttributes(jsx);
      expect(html).toBe('');
    });
  });

  describe('htmlToJsxAttributes', () => {
    it('converts class to className', () => {
      const attributes = { class: 'container' };
      const jsx = htmlToJsxAttributes(attributes);
      expect(jsx).toBe('className="container"');
    });

    it('converts for to htmlFor', () => {
      const attributes = { for: 'input' };
      const jsx = htmlToJsxAttributes(attributes);
      expect(jsx).toBe('htmlFor="input"');
    });

    it('converts tabindex to tabIndex', () => {
      const attributes = { tabindex: '0' };
      const jsx = htmlToJsxAttributes(attributes);
      expect(jsx).toBe('tabIndex="0"');
    });

    it('converts readonly to readOnly', () => {
      const attributes = { readonly: '' };
      const jsx = htmlToJsxAttributes(attributes);
      expect(jsx).toBe('readOnly=""');
    });

    it('handles multiple attributes', () => {
      const attributes = { class: 'btn', disabled: '', tabindex: '0' };
      const jsx = htmlToJsxAttributes(attributes);
      expect(jsx).toBe('className="btn" disabled tabIndex="0"');
    });

    it('handles empty object', () => {
      const attributes = {};
      const jsx = htmlToJsxAttributes(attributes);
      expect(jsx).toBe('');
    });
  });

  describe('convertStyleObjectToString', () => {
    it('converts simple style object to CSS string', () => {
      const style = {
        color: 'red',
        fontSize: '16px',
        backgroundColor: 'blue',
      };
      const css = convertStyleObjectToString(style);
      expect(css).toBe('color: red; font-size: 16px; background-color: blue');
    });

    it('handles camelCase to kebab-case conversion', () => {
      const style = {
        backgroundColor: 'blue',
        fontSize: '14px',
        lineHeight: '1.5',
      };
      const css = convertStyleObjectToString(style);
      expect(css).toBe('background-color: blue; font-size: 14px; line-height: 1.5');
    });

    it('handles numeric values', () => {
      const style = {
        fontSize: 16,
        zIndex: 100,
        opacity: 0.5,
      };
      const css = convertStyleObjectToString(style);
      expect(css).toBe('font-size: 16px; z-index: 100; opacity: 0.5');
    });

    it('handles empty object', () => {
      const style = {};
      const css = convertStyleObjectToString(style);
      expect(css).toBe('');
    });

    it('handles complex values', () => {
      const style = {
        backgroundImage: 'url("image.png")',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      };
      const css = convertStyleObjectToString(style);
      expect(css).toBe(
        'background-image: url("image.png"); box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.3s ease'
      );
    });
  });

  describe('reactEventsToHtml', () => {
    it('converts React events to HTML events', () => {
      const jsx = '<button onClick={handleClick} onChange={handleChange}>Button</button>';
      const html = reactEventsToHtml(jsx);
      expect(html).toBe('<button onclick={handleClick} onchange={handleChange}>Button</button>');
    });

    it('converts all React event handlers', () => {
      const jsx =
        '<input onClick={onClick} onChange={onChange} onSubmit={onSubmit} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onKeyPress={onKeyPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onInput={onInput} />';
      const html = reactEventsToHtml(jsx);
      expect(html).toBe(
        '<input onclick={onClick} onchange={onChange} onsubmit={onSubmit} onfocus={onFocus} onblur={onBlur} onkeydown={onKeyDown} onkeyup={onKeyUp} onkeypress={onKeyPress} onmouseenter={onMouseEnter} onmouseleave={onMouseLeave} onmousedown={onMouseDown} onmouseup={onMouseUp} oninput={onInput} />'
      );
    });

    it('handles empty string', () => {
      const jsx = '';
      const html = reactEventsToHtml(jsx);
      expect(html).toBe('');
    });
  });

  describe('reactEventsToSvelte', () => {
    it('converts React events to Svelte events', () => {
      const jsx = '<button onClick={handleClick} onChange={handleChange}>Button</button>';
      const svelte = reactEventsToSvelte(jsx);
      expect(svelte).toBe('<button on:click={handleClick} on:change={handleChange}>Button</button>');
    });

    it('converts all React event handlers to Svelte syntax', () => {
      const jsx =
        '<input onClick={onClick} onChange={onChange} onSubmit={onSubmit} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onKeyPress={onKeyPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onInput={onInput} />';
      const svelte = reactEventsToSvelte(jsx);
      expect(svelte).toBe(
        '<input on:click={onClick} on:change={onChange} on:submit={onSubmit} on:focus={onFocus} on:blur={onBlur} on:keydown={onKeyDown} on:keyup={onKeyUp} on:keypress={onKeyPress} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave} on:mousedown={onMouseDown} on:mouseup={onMouseUp} on:input={onInput} />'
      );
    });

    it('handles empty string', () => {
      const jsx = '';
      const svelte = reactEventsToSvelte(jsx);
      expect(svelte).toBe('');
    });
  });

  describe('cleanJsxSyntax', () => {
    it('removes JSX fragments', () => {
      const jsx = '<>Content</>';
      const cleaned = cleanJsxSyntax(jsx);
      expect(cleaned).toBe('Content');
    });

    it('removes JSX fragments with whitespace', () => {
      const jsx = '<>  Content  </>';
      const cleaned = cleanJsxSyntax(jsx);
      expect(cleaned).toBe('Content');
    });

    it('removes JSX comments', () => {
      const jsx = '<div>{/* This is a comment */}Content</div>';
      const cleaned = cleanJsxSyntax(jsx);
      expect(cleaned).toBe('<div>Content</div>');
    });

    it('removes multiline JSX comments', () => {
      const jsx = '<div>{/* This is a\nmultiline comment */}Content</div>';
      const cleaned = cleanJsxSyntax(jsx);
      expect(cleaned).toBe('<div>Content</div>');
    });

    it('handles empty string', () => {
      const jsx = '';
      const cleaned = cleanJsxSyntax(jsx);
      expect(cleaned).toBe('');
    });
  });

  describe('jsxToHtml', () => {
    it('performs full JSX to HTML conversion', () => {
      const jsx = '<button className="btn" onClick={handleClick} disabled={true}>Click</button>';
      const html = jsxToHtml(jsx);
      expect(html).toBe('<button class="btn" onclick={handleClick} disabled>Click</button>');
    });

    it('handles complex JSX with multiple attributes', () => {
      const jsx =
        '<input className="form-input" type="text" placeholder="Enter text" onChange={handleChange} autoFocus={true} />';
      const html = jsxToHtml(jsx);
      expect(html).toBe(
        '<input class="form-input" type="text" placeholder="Enter text" onchange={handleChange} autofocus />'
      );
    });

    it('handles empty string', () => {
      const jsx = '';
      const html = jsxToHtml(jsx);
      expect(html).toBe('');
    });
  });

  describe('jsxToSvelte', () => {
    it('performs full JSX to Svelte conversion', () => {
      const jsx = '<button className="btn" onClick={handleClick} disabled={true}>Click</button>';
      const svelte = jsxToSvelte(jsx);
      expect(svelte).toBe('<button class="btn" on:click={handleClick} disabled>Click</button>');
    });

    it('handles complex JSX with multiple attributes', () => {
      const jsx =
        '<input className="form-input" type="text" placeholder="Enter text" onChange={handleChange} autoFocus={true} />';
      const svelte = jsxToSvelte(jsx);
      expect(svelte).toBe(
        '<input class="form-input" type="text" placeholder="Enter text" on:change={handleChange} autofocus />'
      );
    });

    it('handles empty string', () => {
      const jsx = '';
      const svelte = jsxToSvelte(jsx);
      expect(svelte).toBe('');
    });
  });
});

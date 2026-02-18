/**
 * JSX/HTML attribute conversion utilities
 */

/**
 * Convert JSX attributes to HTML attributes
 * className → class, htmlFor → for, etc.
 */
export function jsxToHtmlAttributes(jsxCode: string): string {
  return (
    jsxCode
      // Named attribute renames
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
      // defaultValue — convert before boolean collapsing
      .replace(/defaultValue=/g, 'value=')
      // Convert camelCase dataXxx attributes to data-xxx-yyy
      .replace(/\bdata([A-Z][a-zA-Z]*)=/g, (_, rest) => {
        const kebab = rest.replace(/([A-Z])/g, (c: string) => `-${c.toLowerCase()}`);
        return `data${kebab}=`;
      })
      // Convert camelCase ariaXxx attributes to aria-xxx (fully lowercase, no extra hyphens)
      .replace(/\baria([A-Z][a-zA-Z]*)=/g, (_, rest) => {
        return `aria-${rest.toLowerCase()}=`;
      })
      // Lowercase existing aria-* attribute names (aria-labelledBy → aria-labelledby)
      .replace(/aria-([a-zA-Z]+)=/g, (_, name) => `aria-${name.toLowerCase()}=`)
      // defaultChecked — rename AND protect in one step so checked={true/false} keeps JSX syntax
      .replace(/defaultChecked=\{(true|false)\}/g, (_, val) => `checked=__BOOL_${val.toUpperCase()}__`)
      .replace(/defaultChecked=/g, 'checked=')
      // Protect renamed JSX boolean attrs from the catch-all by temporarily escaping their {true}/{false}
      // These attrs keep JSX expression syntax: readonly={true}, autofocus={false}, etc.
      // Note: plain 'checked' (not from defaultChecked) is NOT protected — checked={false} → checked="false"
      .replace(
        /\b(readonly|autofocus|spellcheck|contenteditable)=\{(true|false)\}/g,
        (_, attr, val) => `${attr}=__BOOL_${val.toUpperCase()}__`
      )
      // Collapse native boolean HTML attributes: disabled={true} → disabled, disabled={false} → (one space)
      .replace(
        /\s+(disabled|required|selected|autoplay|controls|loop|muted|hidden|multiple|defer|async|novalidate|open|reversed|inert|itemscope)=\{(true|false)\}/g,
        (_, attr, value) => (value === 'true' ? ` ${attr}` : ' ')
      )
      // Collapse consecutive spaces left by false-boolean removal into a single space (except preserve one)
      // We intentionally leave one space so <input  /> stays as-is when all attrs are false
      .replace(/ {3,}/g, '  ')
      // Convert remaining JSX boolean expressions to string values
      .replace(/=\{true\}/g, '="true"')
      .replace(/=\{false\}/g, '="false"')
      // Restore protected boolean attrs back to {true}/{false}
      .replace(/=__BOOL_TRUE__/g, '={true}')
      .replace(/=__BOOL_FALSE__/g, '={false}')
  );
}

/**
 * Convert React event handlers to lowercase HTML event attributes
 * onClick → onclick, onChange → onchange, etc.
 */
export function reactEventsToHtml(jsxCode: string): string {
  return jsxCode
    .replace(/onClick=/g, 'onclick=')
    .replace(/onChange=/g, 'onchange=')
    .replace(/onSubmit=/g, 'onsubmit=')
    .replace(/onFocus=/g, 'onfocus=')
    .replace(/onBlur=/g, 'onblur=')
    .replace(/onKeyDown=/g, 'onkeydown=')
    .replace(/onKeyUp=/g, 'onkeyup=')
    .replace(/onKeyPress=/g, 'onkeypress=')
    .replace(/onMouseEnter=/g, 'onmouseenter=')
    .replace(/onMouseLeave=/g, 'onmouseleave=')
    .replace(/onMouseDown=/g, 'onmousedown=')
    .replace(/onMouseUp=/g, 'onmouseup=')
    .replace(/onInput=/g, 'oninput=');
}

/**
 * Convert React event handlers to Svelte event syntax
 * onClick → on:click, onChange → on:change, etc.
 */
export function reactEventsToSvelte(jsxCode: string): string {
  return jsxCode
    .replace(/onClick=/g, 'on:click=')
    .replace(/onChange=/g, 'on:change=')
    .replace(/onSubmit=/g, 'on:submit=')
    .replace(/onFocus=/g, 'on:focus=')
    .replace(/onBlur=/g, 'on:blur=')
    .replace(/onKeyDown=/g, 'on:keydown=')
    .replace(/onKeyUp=/g, 'on:keyup=')
    .replace(/onKeyPress=/g, 'on:keypress=')
    .replace(/onMouseEnter=/g, 'on:mouseenter=')
    .replace(/onMouseLeave=/g, 'on:mouseleave=')
    .replace(/onMouseDown=/g, 'on:mousedown=')
    .replace(/onMouseUp=/g, 'on:mouseup=')
    .replace(/onInput=/g, 'on:input=');
}

/**
 * Remove JSX-specific syntax (fragments, self-closing tags without content)
 */
export function cleanJsxSyntax(jsxCode: string): string {
  return jsxCode
    .replace(/<>\s*/g, '')
    .replace(/\s*<\/>/g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ''); // Remove JSX comments (including multiline)
}

/**
 * Collapse HTML boolean attributes that still carry {true}/{false} after attribute renaming.
 * autofocus={true} → autofocus, autofocus={false} → (removed with space preserved)
 */
function collapseHtmlBooleans(code: string): string {
  const htmlBooleans = 'autofocus|readonly|checked|spellcheck|contenteditable|disabled|required|selected|multiple|autoplay|controls|loop|muted|hidden|defer|async|novalidate|open|reversed|inert|itemscope';
  return code
    .replace(new RegExp(`\\s+(${htmlBooleans})=\\{true\\}`, 'g'), (_, attr) => ` ${attr}`)
    .replace(new RegExp(`\\s+(${htmlBooleans})=\\{false\\}`, 'g'), () => ' ');
}

/**
 * Full JSX to HTML conversion
 */
export function jsxToHtml(jsxCode: string): string {
  let result = jsxCode;
  result = jsxToHtmlAttributes(result);
  result = reactEventsToHtml(result);
  result = collapseHtmlBooleans(result);
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
  result = collapseHtmlBooleans(result);
  result = cleanJsxSyntax(result);
  return result;
}

/**
 * Convert HTML attributes object to JSX attributes string
 */
export function htmlToJsxAttributes(attributes: Record<string, string>): string {
  const attrMap: Record<string, string> = {
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

  // Boolean HTML attributes that render without a value when present
  // Note: readonly/autofocus excluded — tests expect them to keep their value (readOnly="")
  const booleanAttrs = new Set([
    'disabled', 'required', 'checked', 'selected', 'multiple',
    'autoplay', 'controls', 'loop',
    'muted', 'hidden', 'defer', 'async', 'open', 'reversed',
  ]);

  return Object.entries(attributes)
    .map(([key, value]) => {
      const jsxKey = attrMap[key] ?? key;
      if (booleanAttrs.has(key) && value === '' && !attrMap[key]) {
        return jsxKey;
      }
      return `${jsxKey}="${value}"`;
    })
    .join(' ');
}

/**
 * Convert style object to CSS string
 */
export function convertStyleObjectToString(styleObject: Record<string, string | number>): string {
  // CSS properties that take unitless numeric values
  const unitlessProperties = new Set([
    'z-index', 'opacity', 'flex', 'flex-grow', 'flex-shrink', 'order',
    'line-height', 'font-weight', 'column-count', 'fill-opacity',
    'stroke-opacity', 'stroke-dashoffset', 'stroke-width', 'tab-size',
    'counter-increment', 'counter-reset', 'zoom', 'animation-iteration-count',
  ]);

  return Object.entries(styleObject)
    .map(([property, value]) => {
      const cssProperty = property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      // Add px for integer numeric values unless the property is unitless
      const cssValue =
        typeof value === 'number' && Number.isInteger(value) && !unitlessProperties.has(cssProperty)
          ? `${value}px`
          : value;
      return `${cssProperty}: ${cssValue}`;
    })
    .join('; ');
}

/**
 * Parse style string to object
 */
export function parseStyleString(styleString: string): Record<string, string> {
  const styles: Record<string, string> = {};

  if (!styleString) return styles;

  styleString.split(';').forEach(rule => {
    const colonIndex = rule.indexOf(':');
    if (colonIndex === -1) return;
    const property = rule.slice(0, colonIndex).trim();
    const value = rule.slice(colonIndex + 1).trim();
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
      styles[camelCaseProperty] = value;
    }
  });

  return styles;
}

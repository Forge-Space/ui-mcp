import { designContextStore, type IDesignContext, type IScreenElement, type ITransition } from '@forgespace/siza-gen';

export interface PrototypeBuildOptions {
  screens: Array<{ name: string; description?: string; elements: IScreenElement[] }>;
  navigationFlow: ITransition[];
  designContext?: IDesignContext;
  useTailwindCdn?: boolean;
}

function containsDangerousContent(str: string): boolean {
  const dangerous = [
    /<script/gi,
    /<\/script>/gi,
    /javascript:/gi,
    /data:(?!image\/)/gi, // Block data: URIs except safe image types
    /vbscript:/gi,
    /on\w+\s*=/gi, // Event handlers: onclick, onload, onerror, etc.
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];
  return dangerous.some((pattern) => pattern.test(str));
}

function validateElements(elements: IScreenElement[]): void {
  for (const el of elements) {
    if (el.id && containsDangerousContent(el.id)) {
      throw new Error(
        `Security error: Element ID "${el.id}" contains potentially dangerous content (XSS attempt detected)`
      );
    }
    if (el.label && containsDangerousContent(el.label)) {
      throw new Error(
        `Security error: Element label "${el.label}" contains potentially dangerous content (XSS attempt detected)`
      );
    }
    if (el.placeholder && containsDangerousContent(el.placeholder)) {
      throw new Error(
        `Security error: Element placeholder "${el.placeholder}" contains potentially dangerous content (XSS attempt detected)`
      );
    }
    if (el.styles) {
      for (const [key, value] of Object.entries(el.styles)) {
        if (containsDangerousContent(value)) {
          throw new Error(
            `Security error: Element style "${key}" contains potentially dangerous content (XSS attempt detected)`
          );
        }
      }
    }
    if (el.children) {
      validateElements(el.children);
    }
  }
}

export function buildPrototype(options: PrototypeBuildOptions): string {
  const { screens, navigationFlow, useTailwindCdn = true } = options;
  const ctx = options.designContext ?? designContextStore.get();

  // Validate screen names, descriptions, and all element fields for dangerous content
  for (const screen of screens) {
    if (containsDangerousContent(screen.name)) {
      throw new Error(
        `Security error: Screen name "${screen.name}" contains potentially dangerous content (XSS attempt detected)`
      );
    }
    if (screen.description && containsDangerousContent(screen.description)) {
      throw new Error(
        `Security error: Screen description contains potentially dangerous content (XSS attempt detected)`
      );
    }
    validateElements(screen.elements);
  }

  const screenSections = screens
    .map((screen, i) => {
      const id = toScreenId(screen.name);
      const display = i === 0 ? 'flex' : 'none';
      const elementsHtml = screen.elements.map((el) => renderElement(el, navigationFlow)).join('\n      ');

      return `
    <section id="${id}" class="screen" style="display: ${display}; flex-direction: column; min-height: 100vh; padding: 24px;">
      <h2 style="font-size: ${ctx.typography.fontSize['2xl']}; font-weight: ${ctx.typography.fontWeight.bold}; margin-bottom: 16px; color: ${ctx.colorPalette.foreground};">
        ${escapeHtml(screen.name)}
      </h2>
      ${screen.description ? `<p style="color: ${ctx.colorPalette.mutedForeground}; margin-bottom: 24px;">${escapeHtml(screen.description)}</p>` : ''}
      ${elementsHtml}
    </section>`;
    })
    .join('\n');

  const navScript = buildNavigationScript(navigationFlow);
  const cssVars = buildCssVars(ctx);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UIForge Prototype</title>
  ${useTailwindCdn ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
  <style>
    :root {
${cssVars}
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${ctx.typography.fontFamily};
      background-color: var(--background);
      color: var(--foreground);
      line-height: ${ctx.typography.lineHeight.normal};
    }
    .screen {
      transition: opacity 0.3s ease-in-out;
    }
    .screen.fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }
    .screen.slide-left {
      animation: slideLeft 0.3s ease-in-out;
    }
    .screen.slide-right {
      animation: slideRight 0.3s ease-in-out;
    }
    .screen.slide-up {
      animation: slideUp 0.3s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes slideLeft {
      from { transform: translateX(100%); } to { transform: translateX(0); }
    }
    @keyframes slideRight {
      from { transform: translateX(-100%); } to { transform: translateX(0); }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); } to { transform: translateY(0); }
    }
    .proto-btn {
      padding: 10px 20px;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      transition: opacity 0.2s;
    }
    .proto-btn:hover { opacity: 0.85; }
    .proto-btn-primary {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }
    .proto-btn-secondary {
      background-color: var(--secondary);
      color: var(--secondary-foreground);
    }
    .proto-input {
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      font-size: 14px;
      width: 100%;
      max-width: 400px;
      outline: none;
    }
    .proto-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent);
    }
    .proto-card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: ${ctx.shadows.sm};
    }
    .proto-nav {
      display: flex;
      gap: 16px;
      padding: 12px 24px;
      background: var(--primary);
      color: var(--primary-foreground);
      align-items: center;
    }
    .proto-nav a {
      color: var(--primary-foreground);
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
    }
    .proto-divider {
      height: 1px;
      background: var(--border);
      margin: 16px 0;
    }
  </style>
</head>
<body>
  ${screenSections}

  <script>
${navScript}
  </script>
</body>
</html>`;
}

function buildCssVars(ctx: IDesignContext): string {
  const vars = [
    `      --primary: ${ctx.colorPalette.primary};`,
    `      --primary-foreground: ${ctx.colorPalette.primaryForeground};`,
    `      --secondary: ${ctx.colorPalette.secondary};`,
    `      --secondary-foreground: ${ctx.colorPalette.secondaryForeground};`,
    `      --accent: ${ctx.colorPalette.accent};`,
    `      --accent-foreground: ${ctx.colorPalette.accentForeground};`,
    `      --background: ${ctx.colorPalette.background};`,
    `      --foreground: ${ctx.colorPalette.foreground};`,
    `      --muted: ${ctx.colorPalette.muted};`,
    `      --muted-foreground: ${ctx.colorPalette.mutedForeground};`,
    `      --border: ${ctx.colorPalette.border};`,
    `      --destructive: ${ctx.colorPalette.destructive};`,
    `      --destructive-foreground: ${ctx.colorPalette.destructiveForeground};`,
    `      --radius-sm: ${ctx.borderRadius.sm};`,
    `      --radius-md: ${ctx.borderRadius.md};`,
    `      --radius-lg: ${ctx.borderRadius.lg};`,
  ];
  return vars.join('\n');
}

function escapeJsString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/<\/script>/gi, '<\\/script>') // Prevent script tag breaking
    .replace(/<!--/g, '<\\!--'); // Prevent HTML comment injection
}

function buildNavigationScript(flows: ITransition[]): string {
  const cases = flows
    .map((flow) => {
      const fromId = toScreenId(flow.from);
      const toId = toScreenId(flow.to);
      const animation = flow.animation ?? 'fade';
      const animClass = animation === 'none' ? '' : animation === 'fade' ? 'fade-in' : animation;
      const trigger = escapeJsString(flow.trigger);
      const targetElement = flow.targetElement ? `'${escapeJsString(flow.targetElement)}'` : 'null';

      return `
      { from: '${escapeJsString(fromId)}', to: '${escapeJsString(toId)}', trigger: '${trigger}', targetElement: ${targetElement}, animClass: '${escapeJsString(animClass)}' }`;
    })
    .join(',');

  return `
    const flows = [${cases}
    ];

    function navigateTo(screenId, animClass) {
      document.querySelectorAll('.screen').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('fade-in', 'slide-left', 'slide-right', 'slide-up');
      });
      const target = document.getElementById(screenId);
      if (target) {
        target.style.display = 'flex';
        if (animClass) target.classList.add(animClass);
      }
    }

    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-nav-to]');
      if (!el) return;
      const toScreen = el.getAttribute('data-nav-to');
      const animClass = el.getAttribute('data-nav-anim') || 'fade-in';
      navigateTo(toScreen, animClass);
    });

    // Auto-wire flows for elements with matching IDs
    flows.forEach(flow => {
      if (flow.targetElement) {
        const el = document.getElementById(flow.targetElement);
        if (el) {
          el.setAttribute('data-nav-to', flow.to);
          el.setAttribute('data-nav-anim', flow.animClass);
          el.style.cursor = 'pointer';
        }
      }
    });
  `;
}

function renderElement(el: IScreenElement, flows: ITransition[]): string {
  const navAttrs = buildNavAttrs(el, flows);
  const styleStr = el.styles
    ? ` style="${Object.entries(el.styles)
        .map(([k, v]) => `${camelToKebab(k)}: ${v}`)
        .join('; ')}"`
    : '';

  switch (el.type) {
    case 'heading':
      return `<h3 id="${el.id}"${styleStr}${navAttrs}>${escapeHtml(el.label ?? '')}</h3>`;

    case 'text':
      return `<p id="${el.id}"${styleStr}${navAttrs}>${escapeHtml(el.label ?? '')}</p>`;

    case 'button':
      return `<button id="${el.id}" class="proto-btn proto-btn-primary"${styleStr}${navAttrs}>${escapeHtml(el.label ?? 'Button')}</button>`;

    case 'input':
      return `<input id="${el.id}" class="proto-input" placeholder="${escapeHtml(el.placeholder ?? 'Enter text...')}"${styleStr}${navAttrs} />`;

    case 'image':
      return `<div id="${el.id}" style="width: 100%; max-width: 400px; height: 200px; background: var(--muted); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--muted-foreground);"${navAttrs}>${escapeHtml(el.label ?? 'Image placeholder')}</div>`;

    case 'card': {
      const childrenHtml = el.children?.map((c) => renderElement(c, flows)).join('\n        ') ?? '';
      return `<div id="${el.id}" class="proto-card"${styleStr}${navAttrs}>
        ${el.label ? `<h4 style="font-weight: 600; margin-bottom: 8px;">${escapeHtml(el.label)}</h4>` : ''}
        ${childrenHtml}
      </div>`;
    }

    case 'nav': {
      const links =
        el.children
          ?.map((c) => {
            const cNavAttrs = buildNavAttrs(c, flows);
            return `<a id="${c.id}"${cNavAttrs}>${escapeHtml(c.label ?? '')}</a>`;
          })
          .join('\n          ') ?? '';
      return `<nav id="${el.id}" class="proto-nav"${styleStr}>
          ${links}
        </nav>`;
    }

    case 'list': {
      const items =
        el.children?.map((c) => `<li id="${c.id}">${escapeHtml(c.label ?? '')}</li>`).join('\n          ') ?? '';
      return `<ul id="${el.id}" style="list-style: disc; padding-left: 20px;"${styleStr}${navAttrs}>
          ${items}
        </ul>`;
    }

    case 'container': {
      const childrenHtml = el.children?.map((c) => renderElement(c, flows)).join('\n        ') ?? '';
      return `<div id="${el.id}"${styleStr}${navAttrs}>
        ${childrenHtml}
      </div>`;
    }

    case 'icon':
      return `<span id="${el.id}" style="font-size: 24px;"${styleStr}${navAttrs}>${escapeHtml(el.label ?? '●')}</span>`;

    case 'divider':
      return `<div id="${el.id}" class="proto-divider"${styleStr}></div>`;

    default:
      return `<div id="${el.id}"${styleStr}${navAttrs}>${escapeHtml(el.label ?? '')}</div>`;
  }
}

function buildNavAttrs(el: IScreenElement, flows: ITransition[]): string {
  const flow = flows.find((f) => f.targetElement === el.id);
  if (!flow) return '';
  const toId = toScreenId(flow.to);
  const anim = flow.animation ?? 'fade';
  const animClass = anim === 'none' ? '' : anim === 'fade' ? 'fade-in' : anim;
  return ` data-nav-to="${escapeHtml(toId)}" data-nav-anim="${escapeHtml(animClass)}" style="cursor: pointer;"`;
}

function toScreenId(name: string): string {
  return `screen-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

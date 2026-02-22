#!/usr/bin/env node
/**
 * End-to-end MCP server test script.
 * Spawns the uiforge MCP server as a child process and exercises each tool
 * via the JSON-RPC stdio transport.
 */

import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERVER_PATH = resolve(__dirname, '..', 'dist', 'index.js');

// ── Helpers ──────────────────────────────────────────────────────

let proc;
let buffer = '';
const pending = new Map(); // id → { resolve, reject }

function send(msg) {
  const json = JSON.stringify(msg);
  const frame = `Content-Length: ${Buffer.byteLength(json)}\r\n\r\n${json}`;
  proc.stdin.write(frame);
}

function request(method, params = {}) {
  const id = randomUUID();
  return new Promise((res, rej) => {
    pending.set(id, { resolve: res, reject: rej });
    send({ jsonrpc: '2.0', id, method, params });
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        rej(new Error(`Timeout waiting for response to ${method}`));
      }
    }, 30_000);
  });
}

function handleData(chunk) {
  buffer += chunk.toString();
  while (true) {
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) break;
    const header = buffer.slice(0, headerEnd);
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }
    const len = parseInt(match[1], 10);
    const bodyStart = headerEnd + 4;
    if (buffer.length < bodyStart + len) break;
    const body = buffer.slice(bodyStart, bodyStart + len);
    buffer = buffer.slice(bodyStart + len);
    try {
      const msg = JSON.parse(body);
      if (msg.id && pending.has(msg.id)) {
        const p = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) p.reject(new Error(JSON.stringify(msg.error)));
        else p.resolve(msg.result);
      }
    } catch {
      /* ignore parse errors */
    }
  }
}

// ── Test runner ──────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures = [];

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed++;
    failures.push({ name, error: err.message });
    console.log(`  ❌ ${name}: ${err.message}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

// ── Main ─────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀 Starting uiforge MCP server...\n');

  proc = spawn('node', [SERVER_PATH], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'test' },
  });

  proc.stdout.on('data', handleData);
  proc.stderr.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.log(`  [stderr] ${msg}`);
  });

  // Give server a moment to start
  await new Promise((r) => setTimeout(r, 1000));

  // ── 1. Initialize ──────────────────────────────────────────────
  console.log('📋 Protocol handshake');

  await test('initialize handshake', async () => {
    const res = await request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-runner', version: '1.0.0' },
    });
    assert(res.serverInfo, 'Missing serverInfo');
    assert(res.serverInfo.name === 'uiforge', `Expected server name "uiforge", got "${res.serverInfo.name}"`);
    console.log(`    Server: ${res.serverInfo.name} v${res.serverInfo.version}`);
    // Send initialized notification
    send({ jsonrpc: '2.0', method: 'notifications/initialized' });
  });

  // ── 2. List tools ──────────────────────────────────────────────
  console.log('\n📋 Tool discovery');

  let toolNames = [];
  await test('list tools', async () => {
    const res = await request('tools/list');
    assert(res.tools && res.tools.length > 0, 'No tools returned');
    toolNames = res.tools.map((t) => t.name);
    console.log(`    Found ${res.tools.length} tools: ${toolNames.join(', ')}`);
  });

  // ── 3. List resources ──────────────────────────────────────────
  console.log('\n📋 Resource discovery');

  await test('list resources', async () => {
    const res = await request('resources/list');
    assert(res.resources, 'No resources key');
    console.log(`    Found ${res.resources.length} resource(s)`);
    if (res.resources.length > 0) {
      console.log(`    Resources: ${res.resources.map((r) => r.name || r.uri).join(', ')}`);
    }
  });

  // ── 4. Test scaffold_full_application ──────────────────────────
  console.log('\n📋 Tool: scaffold_full_application');

  await test('scaffold React project', async () => {
    const res = await request('tools/call', {
      name: 'scaffold_full_application',
      arguments: {
        project_name: 'test-react-app',
        framework: 'react',
        styling: 'tailwindcss',
        architecture: 'flat',
        state_management: 'zustand',
      },
    });
    assert(res.content && res.content.length > 0, 'No content returned');
    const text = res.content[0].text;
    assert(text.includes('package.json'), 'Missing package.json in output');
    assert(text.includes('App.tsx') || text.includes('app.tsx'), 'Missing App.tsx in output');
    console.log(`    Output length: ${text.length} chars`);
  });

  await test('scaffold Next.js project', async () => {
    const res = await request('tools/call', {
      name: 'scaffold_full_application',
      arguments: {
        project_name: 'test-next-app',
        framework: 'nextjs',
        styling: 'tailwindcss',
        architecture: 'flat',
        state_management: 'none',
      },
    });
    const text = res.content[0].text;
    assert(text.includes('next.config'), 'Missing next.config in output');
    assert(text.includes('layout.tsx'), 'Missing layout.tsx in output');
  });

  await test('scaffold Vue project', async () => {
    const res = await request('tools/call', {
      name: 'scaffold_full_application',
      arguments: {
        project_name: 'test-vue-app',
        framework: 'vue',
        styling: 'tailwindcss',
        architecture: 'flat',
        state_management: 'pinia',
      },
    });
    const text = res.content[0].text;
    assert(text.includes('App.vue'), 'Missing App.vue in output');
    assert(text.includes('pinia'), 'Missing pinia in output');
  });

  await test('scaffold Angular project', async () => {
    const res = await request('tools/call', {
      name: 'scaffold_full_application',
      arguments: {
        project_name: 'test-ng-app',
        framework: 'angular',
        styling: 'tailwindcss',
        architecture: 'flat',
        state_management: 'signals',
      },
    });
    const text = res.content[0].text;
    assert(text.includes('angular.json'), 'Missing angular.json in output');
    assert(text.includes('app.component'), 'Missing app.component in output');
  });

  // ── 5. Test generate_ui_component ──────────────────────────────
  console.log('\n📋 Tool: generate_ui_component');

  const componentTypes = ['button', 'card', 'form', 'nav', 'hero', 'modal', 'table', 'sidebar'];
  for (const ctype of componentTypes) {
    await test(`generate ${ctype} component (react)`, async () => {
      const res = await request('tools/call', {
        name: 'generate_ui_component',
        arguments: {
          name: `My${ctype.charAt(0).toUpperCase() + ctype.slice(1)}`,
          type: ctype,
          framework: 'react',
        },
      });
      assert(res.content && res.content.length > 0, 'No content');
      const text = res.content[0].text;
      assert(text.includes('className'), `Missing className in ${ctype} component`);
    });
  }

  await test('generate component for Vue', async () => {
    const res = await request('tools/call', {
      name: 'generate_ui_component',
      arguments: { name: 'TestCard', type: 'card', framework: 'vue' },
    });
    const text = res.content[0].text;
    assert(text.includes('<template>') || text.includes('class='), 'Missing Vue template');
  });

  await test('generate component for Angular', async () => {
    const res = await request('tools/call', {
      name: 'generate_ui_component',
      arguments: { name: 'TestCard', type: 'card', framework: 'angular' },
    });
    const text = res.content[0].text;
    assert(text.includes('@Component') || text.includes('class='), 'Missing Angular component');
  });

  // ── 6. Test generate_prototype ─────────────────────────────────
  console.log('\n📋 Tool: generate_prototype');

  await test('generate HTML prototype', async () => {
    const res = await request('tools/call', {
      name: 'generate_prototype',
      arguments: {
        screens: [
          {
            id: 'home',
            name: 'Home',
            elements: [
              { id: 'h1', type: 'heading', label: 'Welcome' },
              { id: 'btn', type: 'button', label: 'Go to About', action: 'navigate:about' },
            ],
            transitions: [{ from: 'home', to: 'about', trigger: 'click', targetElement: 'btn' }],
          },
          {
            id: 'about',
            name: 'About',
            elements: [
              { id: 'h2', type: 'heading', label: 'About Us' },
              { id: 'txt', type: 'text', label: 'Some info here' },
            ],
            transitions: [],
          },
        ],
        output_format: 'html',
      },
    });
    const text = res.content[0].text;
    assert(text.includes('<!DOCTYPE html>') || text.includes('<html'), 'Missing HTML in prototype');
    assert(text.includes('Welcome') || text.includes('home'), 'Missing screen content');
  });

  // ── 7. Test generate_design_image ──────────────────────────────
  console.log('\n📋 Tool: generate_design_image');

  await test('generate wireframe SVG', async () => {
    const res = await request('tools/call', {
      name: 'generate_design_image',
      arguments: {
        component_name: 'LoginForm',
        image_type: 'wireframe',
        output_format: 'svg',
        elements: [
          { type: 'heading', label: 'Login' },
          { type: 'input', placeholder: 'Email' },
          { type: 'input', placeholder: 'Password' },
          { type: 'button', label: 'Sign In' },
        ],
      },
    });
    assert(res.content && res.content.length > 0, 'No content');
    // SVG output may be text or embedded image
    const hasContent = res.content.some(
      (c) => (c.text && (c.text.includes('<svg') || c.text.includes('svg'))) || c.type === 'image'
    );
    assert(hasContent, 'Missing SVG or image content');
  });

  // ── 8. Test fetch_design_inspiration ───────────────────────────
  console.log('\n📋 Tool: fetch_design_inspiration');

  await test('fetch design inspiration', async () => {
    const res = await request('tools/call', {
      name: 'fetch_design_inspiration',
      arguments: { category: 'color' },
    });
    assert(res.content && res.content.length > 0, 'No content');
    const text = res.content[0].text;
    assert(text.length > 10, 'Inspiration content too short');
  });

  // ── 9. Verify a11y in generated output ─────────────────────────
  console.log('\n📋 A11y & SEO verification');

  await test('React scaffold has ARIA landmarks and SEO', async () => {
    const res = await request('tools/call', {
      name: 'scaffold_full_application',
      arguments: {
        project_name: 'a11y-test',
        framework: 'react',
        styling: 'tailwindcss',
        architecture: 'flat',
        state_management: 'none',
      },
    });
    const text = res.content[0].text;
    assert(text.includes('role="banner"'), 'Missing role="banner"');
    assert(text.includes('role="main"'), 'Missing role="main"');
    assert(text.includes('role="contentinfo"'), 'Missing role="contentinfo"');
    assert(text.includes('aria-label'), 'Missing aria-label');
    assert(text.includes('og:title'), 'Missing og:title');
    assert(text.includes('Skip to main content'), 'Missing skip link');
    assert(text.includes('<noscript>'), 'Missing noscript');
  });

  await test('generated nav component has a11y attributes', async () => {
    const res = await request('tools/call', {
      name: 'generate_ui_component',
      arguments: { name: 'MainNav', type: 'nav', framework: 'react' },
    });
    const text = res.content[0].text;
    assert(text.includes('aria-label'), 'Missing aria-label on nav');
    assert(text.includes('sm:'), 'Missing responsive classes');
  });

  await test('generated modal has dialog role', async () => {
    const res = await request('tools/call', {
      name: 'generate_ui_component',
      arguments: { name: 'ConfirmModal', type: 'modal', framework: 'react' },
    });
    const text = res.content[0].text;
    assert(text.includes('role="dialog"'), 'Missing role="dialog"');
    assert(text.includes('aria-modal'), 'Missing aria-modal');
    assert(text.includes('aria-labelledby'), 'Missing aria-labelledby');
  });

  await test('generated form has proper labels and autocomplete', async () => {
    const res = await request('tools/call', {
      name: 'generate_ui_component',
      arguments: { name: 'LoginForm', type: 'form', framework: 'react' },
    });
    const text = res.content[0].text;
    assert(text.includes('htmlFor'), 'Missing htmlFor on labels');
    assert(text.includes('autoComplete'), 'Missing autoComplete');
    assert(text.includes('aria-required'), 'Missing aria-required');
  });

  // ── 10. Verify responsive design ───────────────────────────────
  console.log('\n📋 Responsive design verification');

  await test('hero component has responsive breakpoints', async () => {
    const res = await request('tools/call', {
      name: 'generate_ui_component',
      arguments: { name: 'Hero', type: 'hero', framework: 'react' },
    });
    const text = res.content[0].text;
    assert(text.includes('sm:'), 'Missing sm: breakpoint');
    assert(text.includes('lg:'), 'Missing lg: breakpoint');
    assert(text.includes('flex-col'), 'Missing mobile-first flex-col');
  });

  // ── Summary ────────────────────────────────────────────────────
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failures.length > 0) {
    console.log('❌ Failures:');
    for (const f of failures) {
      console.log(`   • ${f.name}: ${f.error}`);
    }
  }

  proc.kill();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  if (proc) proc.kill();
  process.exit(1);
});

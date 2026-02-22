#!/usr/bin/env node
/**
 * Simple MCP server test - verifies basic communication
 */

import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERVER_PATH = resolve(__dirname, '..', 'dist', 'index.js');

console.log('🚀 Starting UIForge MCP server...\n');

const proc = spawn('node', [SERVER_PATH], {
  stdio: ['pipe', 'pipe', 'inherit'],
});

let buffer = '';

proc.stdout.on('data', (chunk) => {
  buffer += chunk.toString();
  console.log('📥 Received:', chunk.toString().slice(0, 200));
});

proc.on('error', (err) => {
  console.error('❌ Process error:', err);
  process.exit(1);
});

// Send initialize request
setTimeout(() => {
  console.log('\n📤 Sending initialize request...');
  const initMsg = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test', version: '1.0.0' },
    },
  };

  const json = JSON.stringify(initMsg);
  const frame = `Content-Length: ${Buffer.byteLength(json)}\r\n\r\n${json}`;
  console.log('Frame:', `${frame.slice(0, 100)}...`);
  proc.stdin.write(frame);
}, 1000);

// Timeout after 5 seconds
setTimeout(() => {
  console.log('\n⏱️  Timeout - killing process');
  console.log('Buffer contents:', buffer);
  proc.kill();
  process.exit(buffer.length > 0 ? 0 : 1);
}, 5000);

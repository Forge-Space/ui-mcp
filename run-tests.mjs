import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const proc = spawn('npx', ['jest', '--no-coverage', '--forceExit', '--testTimeout=30000'], {
  cwd: '/Users/lucassantana/Desenvolvimento/uiforge-mcp',
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: false,
});

let out = '';
proc.stdout.on('data', d => { out += d.toString(); });
proc.stderr.on('data', d => { out += d.toString(); });

proc.on('close', code => {
  const summary = out.split('\n').filter(l =>
    /PASS|FAIL|Tests:|Test Suites:|●/.test(l)
  ).join('\n');
  writeFileSync('/Users/lucassantana/Desenvolvimento/uiforge-mcp/test-results.txt', `${summary  }\n\nExit: ${  code}`);
  process.exit(0);
});

setTimeout(() => {
  proc.kill();
  writeFileSync('/Users/lucassantana/Desenvolvimento/uiforge-mcp/test-results.txt', `TIMEOUT\n${  out.slice(-3000)}`);
  process.exit(1);
}, 120000);

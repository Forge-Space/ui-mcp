import { defineConfig, type Options } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node22',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  dts: false, // TypeScript already generates .d.ts files
  splitting: false,
  treeshake: true,
  minify: false, // Keep readable for debugging MCP server
  bundle: true,
  external: [
    // External dependencies that should not be bundled
    '@modelcontextprotocol/sdk',
    'playwright',
    'sharp',
    '@resvg/resvg-js',
    'pino',
    'pino-pretty',
  ],
  esbuildOptions(options, _context) {
    options.platform = 'node';
    options.packages = 'external'; // Don't bundle node_modules
  },
  onSuccess: 'echo "✓ Build completed successfully"',
} satisfies Options);

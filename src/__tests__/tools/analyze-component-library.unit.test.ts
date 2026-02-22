import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '../../lib/config.js';
import {
  registerAnalyzeComponentLibrary,
  analyzeComponentLibraryHandler,
} from '../../tools/analyze-component-library.js';

describe('analyze_component_library tool', () => {
  beforeAll(() => {
    loadConfig();
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerAnalyzeComponentLibrary(server)).not.toThrow();
  });

  describe('library detection', () => {
    it('detects shadcn/ui from imports', async () => {
      const code = `
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MyButton() {
  return <Button className={cn("px-4", "py-2")}>Click me</Button>
}
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.detectedLibrary).toBe('shadcn');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('detects Radix UI from imports', async () => {
      const code = `
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function MyDialog() {
  return <Dialog.Root><Dialog.Content>Hello</Dialog.Content></Dialog.Root>
}
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.detectedLibrary).toBe('radix');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('detects Headless UI from imports', async () => {
      const code = `
import { Dialog, Transition } from '@headlessui/react'

export function MyModal() {
  return <Dialog open={true} onClose={() => {}}>Content</Dialog>
}
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.detectedLibrary).toBe('headlessui');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('detects Material-UI from imports', async () => {
      const code = `
import Button from '@mui/material/Button'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export function App() {
  return <ThemeProvider theme={createTheme()}><Button>Click</Button></ThemeProvider>
}
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.detectedLibrary).toBe('material');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('returns null library for plain React code', async () => {
      const code = `
export function MyButton({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-500 text-white">{children}</button>
}
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.detectedLibrary).toBeUndefined();
      expect(result.confidence).toBe(0);
    });
  });

  describe('pattern analysis', () => {
    it('detects forwardRef pattern', async () => {
      const code = `
import { forwardRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => <button ref={ref} {...props}>{children}</button>
)
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: false,
        analyzePatterns: true,
        suggestMigration: false,
      });

      const forwardRefPattern = result.patterns.find((p) => p.type === 'forwardRef');
      expect(forwardRefPattern).toBeDefined();
      expect(forwardRefPattern?.occurrences).toBeGreaterThan(0);
    });

    it('detects accessibility attributes', async () => {
      const code = `
export function Modal({ isOpen }: { isOpen: boolean }) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="title">
      <h2 id="title">Modal Title</h2>
    </div>
  )
}
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: false,
        analyzePatterns: true,
        suggestMigration: false,
      });

      const a11yPattern = result.patterns.find((p) => p.type === 'accessibility');
      expect(a11yPattern).toBeDefined();
      expect(a11yPattern?.occurrences).toBeGreaterThan(0);
    });

    it('detects compound component pattern', async () => {
      const code = `
import { createContext, useContext } from 'react'

const TabsContext = createContext<TabsContextValue | null>(null)

export function Tabs({ children }: TabsProps) {
  const ctx = useContext(TabsContext)
  return <div>{children}</div>
}
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: false,
        analyzePatterns: true,
        suggestMigration: false,
      });

      const compoundPattern = result.patterns.find((p) => p.type === 'compound');
      expect(compoundPattern).toBeDefined();
    });

    it('returns empty patterns when analyzePatterns is false', async () => {
      const code = `
import { forwardRef } from 'react'
export const Button = forwardRef(() => <button />)
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: false,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.patterns).toHaveLength(0);
    });
  });

  describe('component extraction', () => {
    it('extracts exported component names', async () => {
      const code = `
export function Button() { return <button /> }
export const Card = () => <div />
export class Modal extends React.Component { render() { return <div /> } }
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: false,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.components).toContain('Button');
      expect(result.components).toContain('Card');
    });
  });

  describe('migration suggestions', () => {
    it('generates migration suggestions from MUI to shadcn', async () => {
      const code = `
import Button from '@mui/material/Button'
import { ThemeProvider } from '@mui/material/styles'
export function App() { return <ThemeProvider><Button>Click</Button></ThemeProvider> }
`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: true,
        targetLibrary: 'shadcn',
      });

      expect(result.migrationSuggestions).toBeDefined();
      expect(result.migrationSuggestions!.length).toBeGreaterThan(0);
      expect(result.migrationSuggestions![0]).toHaveProperty('from');
      expect(result.migrationSuggestions![0]).toHaveProperty('to');
      expect(result.migrationSuggestions![0]).toHaveProperty('effort');
    });

    it('returns no suggestions when same library is target', async () => {
      const code = `import { Button } from "@/components/ui/button"`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: true,
        targetLibrary: 'shadcn',
      });

      expect(result.migrationSuggestions).toHaveLength(0);
    });

    it('returns no suggestions when suggestMigration is false', async () => {
      const code = `import Button from '@mui/material/Button'`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
        targetLibrary: 'shadcn',
      });

      expect(result.migrationSuggestions).toBeUndefined();
    });
  });

  describe('summary generation', () => {
    it('includes library name in summary when detected', async () => {
      const code = `import { Button } from "@/components/ui/button"`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.summary).toContain('shadcn');
    });

    it('indicates no library when none detected', async () => {
      const code = `export function Button() { return <button /> }`;
      const result = await analyzeComponentLibraryHandler({
        code,
        detectLibrary: true,
        analyzePatterns: false,
        suggestMigration: false,
      });

      expect(result.summary).toContain('No specific component library detected');
    });
  });
});

import { createRequire } from 'node:module';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig, initializeRegistry } from '@forgespace/siza-gen';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json') as { version: string };

describe('MCP Server Index', () => {
  beforeAll(() => {
    loadConfig();
    initializeRegistry();
  });

  it('imports all tool registration functions', async () => {
    const { registerScaffoldFullApplication } = await import('../tools/scaffold-full-application.js');
    const { registerGenerateUiComponent } = await import('../tools/generate-ui-component.js');
    const { registerGeneratePrototype } = await import('../tools/generate-prototype.js');
    const { registerGenerateDesignImage } = await import('../tools/generate-design-image.js');
    const { registerFetchDesignInspiration } = await import('../tools/fetch-design-inspiration.js');
    const { registerFigmaContextParser } = await import('../tools/figma-context-parser.js');
    const { registerFigmaPushVariables } = await import('../tools/figma-push-variables.js');
    const { registerAnalyzeDesignReferences } = await import('../tools/analyze-design-references.js');
    const { registerImageToComponent } = await import('../tools/image-to-component.js');
    const { registerGeneratePageTemplate } = await import('../tools/generate-page-template.js');
    const { registerRefineComponent } = await import('../tools/refine-component.js');
    const { registerAuditAccessibility } = await import('../tools/audit-accessibility.js');
    const { registerGenerateComponentLibrary } = await import('../tools/generate-component-library.js');
    const { registerSetupComponentLibrary } = await import('../tools/setup-component-library.js');
    const { registerAnalyzeComponentLibrary } = await import('../tools/analyze-component-library.js');
    const { registerForgeAssess } = await import('../tools/forge-assess.js');
    const { registerForgeDiff } = await import('../tools/forge-diff.js');
    const { registerForgeGate } = await import('../tools/forge-gate.js');
    const { registerForgeScan } = await import('../tools/forge-scan.js');
    const { registerForgeMigrate } = await import('../tools/forge-migrate.js');
    const { registerGenerateMigrationPlan } = await import('../tools/generate-migration-plan.js');
    const { registerAssessLegacy } = await import('../tools/assess-legacy.js');
    const { registerGenerateFromPack } = await import('../tools/generate-from-pack.js');
    const { registerForgeContextTools } = await import('../tools/forge-context.js');

    expect(registerScaffoldFullApplication).toBeDefined();
    expect(registerGenerateUiComponent).toBeDefined();
    expect(registerGeneratePrototype).toBeDefined();
    expect(registerGenerateDesignImage).toBeDefined();
    expect(registerFetchDesignInspiration).toBeDefined();
    expect(registerFigmaContextParser).toBeDefined();
    expect(registerFigmaPushVariables).toBeDefined();
    expect(registerAnalyzeDesignReferences).toBeDefined();
    expect(registerImageToComponent).toBeDefined();
    expect(registerGeneratePageTemplate).toBeDefined();
    expect(registerRefineComponent).toBeDefined();
    expect(registerAuditAccessibility).toBeDefined();
    expect(registerGenerateComponentLibrary).toBeDefined();
    expect(registerSetupComponentLibrary).toBeDefined();
    expect(registerAnalyzeComponentLibrary).toBeDefined();
    expect(registerForgeAssess).toBeDefined();
    expect(registerForgeDiff).toBeDefined();
    expect(registerForgeGate).toBeDefined();
    expect(registerForgeScan).toBeDefined();
    expect(registerForgeMigrate).toBeDefined();
    expect(registerGenerateMigrationPlan).toBeDefined();
    expect(registerAssessLegacy).toBeDefined();
    expect(registerGenerateFromPack).toBeDefined();
    expect(registerForgeContextTools).toBeDefined();
  });

  it('imports resource registration functions', async () => {
    const { registerCurrentStylesResource } = await import('../resources/current-styles.js');
    const { registerForgeContextResources } = await import('../resources/forge-context.js');
    expect(registerCurrentStylesResource).toBeDefined();
    expect(registerForgeContextResources).toBeDefined();
  });

  it('can create MCP server instance with package version', () => {
    const server = new McpServer({ name: 'uiforge', version: pkg.version });
    expect(server).toBeDefined();
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('registers all tools and reaches expected minimum tool count', async () => {
    const { registerScaffoldFullApplication } = await import('../tools/scaffold-full-application.js');
    const { registerGenerateUiComponent } = await import('../tools/generate-ui-component.js');
    const { registerGeneratePrototype } = await import('../tools/generate-prototype.js');
    const { registerGenerateDesignImage } = await import('../tools/generate-design-image.js');
    const { registerFetchDesignInspiration } = await import('../tools/fetch-design-inspiration.js');
    const { registerFigmaContextParser } = await import('../tools/figma-context-parser.js');
    const { registerFigmaPushVariables } = await import('../tools/figma-push-variables.js');
    const { registerAnalyzeDesignReferences } = await import('../tools/analyze-design-references.js');
    const { registerImageToComponent } = await import('../tools/image-to-component.js');
    const { registerGeneratePageTemplate } = await import('../tools/generate-page-template.js');
    const { registerRefineComponent } = await import('../tools/refine-component.js');
    const { registerAuditAccessibility } = await import('../tools/audit-accessibility.js');
    const { registerSubmitFeedback } = await import('../tools/submit-feedback.js');
    const { registerAnalyzeDesignImageForTraining } = await import('../tools/analyze-design-image-for-training.js');
    const { registerManageTraining } = await import('../tools/manage-training.js');
    const { registerAnalyzeComponentLibrary } = await import('../tools/analyze-component-library.js');
    const { registerGenerateComponentLibrary } = await import('../tools/generate-component-library.js');
    const { registerForgeContextTools } = await import('../tools/forge-context.js');
    const { registerGenerateFromPack } = await import('../tools/generate-from-pack.js');
    const { registerGenerateApiRoute } = await import('../tools/generate-api-route.js');
    const { registerGenerateBackendModule } = await import('../tools/generate-backend-module.js');
    const { registerScaffoldBackend } = await import('../tools/scaffold-backend.js');
    const { registerGenerateForm } = await import('../tools/generate-form.js');
    const { registerPaymentsRefund } = await import('../tools/payments-refund.js');
    const { registerAssessLegacy } = await import('../tools/assess-legacy.js');
    const { registerGenerateMigrationPlan } = await import('../tools/generate-migration-plan.js');
    const { registerForgeScan } = await import('../tools/forge-scan.js');
    const { registerForgeGate } = await import('../tools/forge-gate.js');
    const { registerForgeDiff } = await import('../tools/forge-diff.js');
    const { registerForgeAssess } = await import('../tools/forge-assess.js');
    const { registerForgeMigrate } = await import('../tools/forge-migrate.js');
    const { registerSetupComponentLibrary } = await import('../tools/setup-component-library.js');

    const server = new McpServer({ name: 'uiforge', version: pkg.version });

    registerScaffoldFullApplication(server);
    registerGenerateUiComponent(server);
    registerGeneratePrototype(server);
    registerGenerateDesignImage(server);
    registerFetchDesignInspiration(server);
    registerFigmaContextParser(server);
    registerFigmaPushVariables(server);
    registerAnalyzeDesignReferences(server);
    registerImageToComponent(server);
    registerGeneratePageTemplate(server);
    registerRefineComponent(server);
    registerAuditAccessibility(server);
    registerSubmitFeedback(server);
    registerAnalyzeDesignImageForTraining(server);
    registerManageTraining(server);
    registerAnalyzeComponentLibrary(server);
    registerGenerateComponentLibrary(server);
    registerForgeContextTools(server);
    registerGenerateFromPack(server);
    registerGenerateApiRoute(server);
    registerGenerateBackendModule(server);
    registerScaffoldBackend(server);
    registerGenerateForm(server);
    registerPaymentsRefund(server);
    registerAssessLegacy(server);
    registerGenerateMigrationPlan(server);
    registerForgeScan(server);
    registerForgeGate(server);
    registerForgeDiff(server);
    registerForgeAssess(server);
    registerForgeMigrate(server);
    registerSetupComponentLibrary(server);

    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    const toolNames = Object.keys(tools);

    // Must have at least 38 tools registered (verified count as of v0.24.0)
    expect(toolNames.length).toBeGreaterThanOrEqual(38);

    // Spot-check key tools are registered
    expect(toolNames).toContain('generate_ui_component');
    expect(toolNames).toContain('generate_component_library');
    expect(toolNames).toContain('get_available_components');
    expect(toolNames).toContain('get_available_libraries');
    expect(toolNames).toContain('setup_component_library');
    expect(toolNames).toContain('validate_component_library_setup');
    expect(toolNames).toContain('get_component_library_status');
    expect(toolNames).toContain('audit_accessibility');
    expect(toolNames).toContain('forge_assess');
    expect(toolNames).toContain('forge_diff');
    expect(toolNames).toContain('forge_gate');
    expect(toolNames).toContain('forge_scan');
    expect(toolNames).toContain('forge_migrate');
  });
});

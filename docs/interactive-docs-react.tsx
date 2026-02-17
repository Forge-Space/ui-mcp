import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ExternalLink, Copy, Check } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  frameworks: string[];
  examples: string[];
}

const tools: Tool[] = [
  {
    id: 'scaffold_full_application',
    name: 'Scaffold Full Application',
    description: 'Generate complete project boilerplate with React, Next.js, Vue, Angular, or HTML + Tailwind CSS',
    category: 'Code Generation',
    frameworks: ['React', 'Next.js', 'Vue', 'Angular', 'HTML'],
    examples: [
      'Create a React dashboard with authentication',
      'Generate a Next.js e-commerce site',
      'Build a Vue.js admin panel'
    ]
  },
  {
    id: 'generate_ui_component',
    name: 'Generate UI Component',
    description: 'Create or iterate UI components with style audit and design context awareness',
    category: 'Code Generation',
    frameworks: ['React', 'Vue', 'Angular', 'HTML'],
    examples: [
      'Create a responsive navigation component',
      'Generate a form with validation',
      'Build a card component with hover effects'
    ]
  },
  {
    id: 'generate_prototype',
    name: 'Generate Interactive Prototype',
    description: 'Create clickable HTML prototypes with screen flows and navigation',
    category: 'Design',
    frameworks: ['HTML'],
    examples: [
      'Create a mobile app prototype',
      'Design a user flow for checkout',
      'Build an interactive wireframe'
    ]
  },
  {
    id: 'generate_design_image',
    name: 'Generate Design Image',
    description: 'Generate SVG/PNG mockup images of UI screens and components',
    category: 'Design',
    frameworks: ['SVG', 'PNG'],
    examples: [
      'Create a landing page mockup',
      'Generate a mobile app design',
      'Design a dashboard layout'
    ]
  },
  {
    id: 'fetch_design_inspiration',
    name: 'Fetch Design Inspiration',
    description: 'Extract visual metadata (colors, typography, layout) from URLs',
    category: 'Context',
    frameworks: ['Web'],
    examples: [
      'Analyze a website for color palette',
      'Extract typography from a design system',
      'Get layout patterns from a reference site'
    ]
  },
  {
    id: 'analyze_design_references',
    name: 'Analyze Design References',
    description: 'Analyze design references from URLs and images, detect common patterns',
    category: 'Context',
    frameworks: ['Web', 'Images'],
    examples: [
      'Compare multiple design references',
      'Extract common UI patterns',
      'Analyze design consistency'
    ]
  },
  {
    id: 'figma_context_parser',
    name: 'Figma Context Parser',
    description: 'Read Figma file nodes, extract tokens, map to Tailwind CSS',
    category: 'Integration',
    frameworks: ['Figma', 'Tailwind'],
    examples: [
      'Extract design tokens from Figma',
      'Convert Figma styles to Tailwind',
      'Sync design system with code'
    ]
  },
  {
    id: 'figma_push_variables',
    name: 'Figma Push Variables',
    description: 'Write design tokens back to Figma as Variables',
    category: 'Integration',
    frameworks: ['Figma'],
    examples: [
      'Push color variables to Figma',
      'Update typography tokens',
      'Sync spacing values'
    ]
  },
  {
    id: 'image_to_component',
    name: 'Image to Component',
    description: 'Convert screenshot/mockup/wireframe image into framework-specific component code',
    category: 'Code Generation',
    frameworks: ['React', 'Vue', 'Angular', 'HTML'],
    examples: [
      'Convert a screenshot to React code',
      'Turn a mockup into Vue component',
      'Generate HTML from wireframe'
    ]
  },
  {
    id: 'generate_page_template',
    name: 'Generate Page Template',
    description: 'Generate pre-built page templates (landing, dashboard, auth, pricing, CRUD, etc.)',
    category: 'Code Generation',
    frameworks: ['React', 'Next.js', 'Vue', 'Angular', 'HTML'],
    examples: [
      'Create a landing page template',
      'Generate a dashboard layout',
      'Build an authentication flow'
    ]
  },
  {
    id: 'refine_component',
    name: 'Refine Component',
    description: 'Iteratively improve existing components via natural language feedback',
    category: 'Code Generation',
    frameworks: ['React', 'Vue', 'Angular', 'HTML'],
    examples: [
      'Improve component accessibility',
      'Add responsive design',
      'Enhance component performance'
    ]
  },
  {
    id: 'audit_accessibility',
    name: 'Audit Accessibility',
    description: 'Audit component code for WCAG 2.1 violations with fix suggestions',
    category: 'Quality',
    frameworks: ['React', 'Vue', 'Angular', 'HTML'],
    examples: [
      'Check accessibility compliance',
      'Generate accessibility fixes',
      'Audit color contrast ratios'
    ]
  },
  {
    id: 'analyze_design_image_for_training',
    name: 'Analyze Design Image for Training',
    description: 'Extract design patterns from images for ML training data generation',
    category: 'ML/AI',
    frameworks: ['Images', 'ML'],
    examples: [
      'Extract patterns from UI designs',
      'Generate training data from screenshots',
      'Analyze design for ML models'
    ]
  }
];

const categories = Array.from(new Set(tools.map(tool => tool.category)));
const allFrameworks = Array.from(new Set(tools.flatMap(tool => tool.frameworks)));

export default function InteractiveDocs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesFrameworks = selectedFrameworks.length === 0 ||
                               selectedFrameworks.some(framework => tool.frameworks.includes(framework));
      return matchesSearch && matchesCategory && matchesFrameworks;
    });
  }, [searchTerm, selectedCategory, selectedFrameworks]);

  const handleFrameworkToggle = (framework: string) => {
    setSelectedFrameworks(prev => 
      prev.includes(framework)
        ? prev.filter(f => f !== framework)
        : [...prev, framework]
    );
  };

  const copyExample = async (example: string) => {
    try {
      await navigator.clipboard.writeText(example);
      setCopiedExample(example);
      setTimeout(() => setCopiedExample(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              🎨 UIForge MCP Server
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Interactive Documentation
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                Version 0.4.1
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                13 Tools Available
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                Zero-Cost Architecture
              </span>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-left bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">🚀 Quick Installation</h2>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Using NPX (Recommended):</p>
                <code className="text-sm bg-slate-800 text-white px-3 py-2 rounded block">
                  npx -y uiforge-mcp@latest
                </code>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Using Docker:</p>
                <code className="text-sm bg-slate-800 text-white px-3 py-2 rounded block">
                  docker run -i uiforge-mcp:latest
                </code>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Frameworks:</span>
              <div className="flex flex-wrap gap-2">
                {allFrameworks.map(framework => (
                  <button
                    key={framework}
                    onClick={() => handleFrameworkToggle(framework)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedFrameworks.includes(framework)
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {framework}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 border border-slate-200"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{tool.name}</h3>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  {tool.category}
                </span>
              </div>
              
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">{tool.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.frameworks.map(framework => (
                  <span
                    key={framework}
                    className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded"
                  >
                    {framework}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>View Details</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center text-slate-500 text-sm">
          Showing {filteredTools.length} of {tools.length} tools
        </div>
      </div>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{selectedTool.name}</h2>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full mb-4">
                  {selectedTool.category}
                </span>
                <p className="text-slate-700 leading-relaxed">{selectedTool.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Supported Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTool.frameworks.map(framework => (
                    <span
                      key={framework}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Example Usage</h3>
                <div className="space-y-3">
                  {selectedTool.examples.map((example, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-slate-700">{example}</p>
                        <button
                          onClick={() => copyExample(example)}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          {copiedExample === example ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
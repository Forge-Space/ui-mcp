import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, ExternalLink, Copy, Check, Moon, Sun } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  frameworks: string[];
  examples: string[];
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSystemDark: boolean;
  isDarkMode: boolean;
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

// Logo component with accessibility
const Logo: React.FC<{ 
  variant: 'anvil' | 'text'; 
  size: 'sm' | 'md' | 'lg'; 
  className?: string;
  alt?: string;
}> = ({ variant, size, className = '', alt }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const defaultAlt = variant === 'anvil' 
    ? 'UIForge MCP Server - Anvil Logo' 
    : 'UIForge MCP Server - Text Logo';

  return (
    <img
      src={`/assets/${variant}-logo.svg`}
      alt={alt || defaultAlt}
      className={`${sizeClasses[size]} ${className} transition-transform hover:scale-105`}
      loading="eager"
      decoding="async"
    />
  );
};

// Theme context
const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSystemDark, setIsSystemDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('uiforge-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (isSystemDark) {
      setTheme('dark');
    }
  }, [isSystemDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('uiforge-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSystemDark, isDarkMode: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default function InteractiveDocs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [copiedExample, setCopiedExample] = useState<string | null>(null);
  const { theme, toggleTheme, isDarkMode } = useTheme();

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

  const handleModalClose = () => {
    setSelectedTool(null);
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedTool) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [selectedTool]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header role="banner" className="mb-12 text-center">
            <div className="mb-8">
              {/* Logo and Title */}
              <div className="flex flex-col items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <Logo variant="anvil" size="lg" className="transform hover:rotate-3 transition-transform duration-300" />
                  <div className="hidden sm:block">
                    <Logo variant="text" size="lg" className="transform hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                    UIForge MCP Server
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-4 transition-colors">
                    Interactive Documentation
                  </p>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                  title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  )}
                </button>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-medium transition-colors">
                  Version 0.4.1
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full font-medium transition-colors">
                  13 Tools Available
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full font-medium transition-colors">
                  Zero-Cost Architecture
                </span>
              </div>
            </div>
            
            {/* Installation Guide */}
            <div className="max-w-3xl mx-auto text-left bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition-colors">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                🚀 Quick Installation
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 transition-colors">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Using NPX (Recommended):</p>
                  <code className="text-sm bg-slate-800 dark:bg-slate-900 text-white px-3 py-2 rounded block font-mono transition-colors">
                    npx -y uiforge-mcp@latest
                  </code>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 transition-colors">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Using Docker:</p>
                  <code className="text-sm bg-slate-800 dark:bg-slate-900 text-white px-3 py-2 rounded block font-mono transition-colors">
                    docker run -i uiforge-mcp:latest
                  </code>
                </div>
              </div>
            </div>
          </header>

          {/* Search and Filters */}
          <section aria-label="Search and filters" className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                aria-label="Search tools"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Frameworks:</span>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by frameworks">
                  {allFrameworks.map(framework => (
                    <button
                      key={framework}
                      onClick={() => handleFrameworkToggle(framework)}
                      className={`px-3 py-1 text-sm rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        selectedFrameworks.includes(framework)
                          ? 'bg-blue-500 text-white shadow-md transform scale-105'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                      }`}
                      aria-label={`Toggle ${framework} filter`}
                      aria-pressed={selectedFrameworks.includes(framework)}
                    >
                      {framework}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <main id="main-content" role="main">
            <section aria-label="Available tools">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredTools.map(tool => (
                  <article
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${tool.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedTool(tool);
                      }
                    }}
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full transition-colors">
                        {tool.category}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 transition-colors">
                      {tool.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.frameworks.map(framework => (
                        <span
                          key={framework}
                          className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded transition-colors"
                        >
                          {framework}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium transition-colors">
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </div>
                  </article>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-center text-slate-500 dark:text-slate-400 text-sm transition-colors">
                Showing {filteredTools.length} of {tools.length} tools
              </div>
            </section>
          </main>
        </div>

        {/* Tool Detail Modal */}
        {selectedTool && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
            onClick={handleModalClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div 
              className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors">
                    {selectedTool.name}
                  </h2>
                  <button
                    onClick={handleModalClose}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
                </div>

                <div className="mb-6">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mb-4 transition-colors">
                    {selectedTool.category}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
                    {selectedTool.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">
                    Supported Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTool.frameworks.map(framework => (
                      <span
                        key={framework}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 transition-colors">
                    Example Usage
                  </h3>
                  <div className="space-y-3">
                    {selectedTool.examples.map((example, index) => (
                      <div key={index} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 transition-colors">
                        <div className="flex items-center justify-between">
                          <p className="text-slate-700 dark:text-slate-300 transition-colors">{example}</p>
                          <button
                            onClick={() => copyExample(example)}
                            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Copy example: ${example}`}
                          >
                            {copiedExample === example ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
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
    </ThemeProvider>
  );
}
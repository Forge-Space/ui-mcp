# Image-to-Training-Data Feature

## Overview

The **Image-to-Training-Data** feature allows UIForge MCP to analyze UI design reference images and extract structured design patterns for machine learning training. This feature **does not store images** - it only extracts and stores structured design data (colors, typography, components, layout patterns, etc.) to improve AI recommendations over time.

## Key Benefits

- 🎨 **Learn from Real Designs**: Extract patterns from actual UI screenshots and mockups
- 🔒 **Privacy-Friendly**: No image storage - only structured design data
- 💰 **Zero-Cost**: Uses existing infrastructure, no external APIs
- 🤖 **Improves AI**: Feeds into existing ML training pipeline
- 📊 **Structured Output**: Converts visual designs into IComponentSnippet format

## Architecture

### Components

1. **Image Design Analyzer** (`src/lib/ml/image-design-analyzer.ts`)
   - Extracts colors, typography, spacing, components, layout, visual style
   - Infers mood and industry from design characteristics
   - Calculates quality score for training data prioritization

2. **Design-to-Training-Data Converter** (`src/lib/ml/design-to-training-data.ts`)
   - Converts analysis into IComponentSnippet format
   - Generates feedback entries for ML training
   - Detects and stores code patterns
   - Integrates with existing feedback system

3. **MCP Tool** (`src/tools/analyze-design-image-for-training.ts`)
   - New tool: `analyze_design_image_for_training`
   - Orchestrates the entire pipeline
   - Returns summary of extracted data

### Data Flow

```
User Image (Base64)
    ↓
Image Analysis
    ↓
Extract Patterns:
  - Colors (hex codes)
  - Typography (font families, sizes, weights)
  - Components (button, card, form, etc.)
  - Layout (grid/flex, responsive)
  - Visual Style (glassmorphism, neubrutalism, etc.)
  - Mood & Industry
    ↓
Convert to Training Data:
  - IComponentSnippet objects
  - Feedback entries (positive scores)
  - Code patterns
    ↓
Store in Database:
  - feedback table
  - code_patterns table
  - component registry
    ↓
Image Discarded (not stored)
    ↓
Return Summary
```

## Usage

### MCP Tool Call

```typescript
{
  "name": "analyze_design_image_for_training",
  "arguments": {
    "image_data": "base64_encoded_image_data",
    "image_mime_type": "image/png",
    "description": "Modern SaaS dashboard with glassmorphism effects",
    "component_name": "DashboardDesign",
    "framework": "react"
  }
}
```

### Parameters

- **image_data** (required): Base64-encoded image data
- **image_mime_type** (optional): MIME type (default: `image/png`)
  - Supported: `image/png`, `image/jpeg`, `image/webp`, `image/gif`
- **description** (optional): Text description to guide analysis
- **component_name** (optional): Name for the design reference (auto-generated if omitted)
- **framework** (optional): Framework context (default: `react`)
  - Supported: `react`, `nextjs`, `vue`, `angular`, `svelte`, `html`

### Response

```json
{
  "trainingData": {
    "snippetsCreated": 3,
    "feedbackEntriesCreated": 4,
    "patternsDetected": 3,
    "summary": "..."
  },
  "analysis": {
    "qualityScore": 0.85,
    "visualStyle": "glassmorphism",
    "mood": ["minimal", "professional"],
    "industry": ["saas"],
    "componentsDetected": 3,
    "colorsExtracted": 8,
    "layoutType": "flex",
    "complexity": "moderate",
    "modernityScore": 0.9
  },
  "metadata": {
    "componentName": "DashboardDesign",
    "framework": "react",
    "duration": 245,
    "imageStored": false,
    "privacyFriendly": true
  }
}
```

## Extracted Data

### 1. Color Palette

Extracts Tailwind CSS color classes from generated code:

- **Primary colors**: `bg-blue-600`, `bg-indigo-500`, etc.
- **Secondary colors**: `bg-gray-200`, `bg-slate-300`, etc.
- **Accent colors**: `bg-pink-500`, `bg-orange-400`, etc.
- **Background colors**: `bg-white`, `bg-gray-50`, etc.
- **Text colors**: `text-gray-900`, `text-slate-700`, etc.

### 2. Typography

Extracts font information:

- **Font families**: `font-sans`, `font-serif`, `font-mono`
- **Heading sizes**: `text-xl`, `text-2xl`, `text-3xl`, etc.
- **Body sizes**: `text-sm`, `text-base`, `text-lg`
- **Weights**: `font-normal`, `font-medium`, `font-bold`, etc.

### 3. Spacing System

Detects spacing patterns:

- **System**: `4px base` or `8px base` (inferred from usage)
- **Padding**: `p-4`, `px-6`, `py-3`, etc.
- **Margin**: `m-2`, `mx-auto`, `my-4`, etc.
- **Gap**: `gap-4`, `gap-x-6`, etc.

### 4. UI Components

Identifies component types:

- **button**: Buttons, CTAs, actions
- **card**: Cards, panels, containers
- **form**: Forms, inputs, fields
- **navigation**: Nav bars, menus, headers
- **hero**: Hero sections, banners
- **footer**: Footer sections
- **modal**: Modals, dialogs, popups
- **table**: Tables, grids, data displays

### 5. Layout Patterns

Analyzes layout structure:

- **Type**: `grid`, `flex`, `stack`
- **Structure**: Description of layout organization
- **Responsive**: Boolean indicating responsive design

### 6. Visual Style

Classifies visual style:

- **glassmorphism**: Backdrop blur, transparency effects
- **neubrutalism**: Bold borders, high contrast
- **soft-depth**: Soft shadows, subtle depth

### 7. Mood & Industry

Infers context from design:

- **Mood**: `bold`, `minimal`, `professional`, `playful`, `creative`, etc.
- **Industry**: `saas`, `fintech`, `ecommerce`, `healthcare`, `general`, etc.

### 8. Quality Score

Calculates design quality (0-1):

- Color palette consistency
- Typography consistency
- Spacing consistency
- Component variety
- Overall design quality

## Database Storage

### Feedback Table

Stores positive feedback for ML training:

```sql
INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
VALUES ('design-learning-123-button', 'Design reference: DashboardDesign', 'button', 1.7, 'implicit', 1234567890)
```

### Code Patterns Table

Stores detected patterns:

```sql
INSERT INTO code_patterns (id, skeleton_hash, skeleton, snippet, component_type, category, frequency, avg_score, promoted)
VALUES ('pattern-abc123', 'abc123', '<button className="*">{*}</button>', '...', 'button', 'molecule', 1, 0.85, 0)
```

### Component Registry

High-quality designs (score ≥ 0.6) are added as new snippets:

```typescript
registerSnippet({
  id: 'learned-dashboarddesign-button-1234567890',
  name: 'DashboardDesign button',
  category: 'atom',
  type: 'button',
  variant: 'default',
  tags: ['button', 'glassmorphism', 'responsive', 'modern'],
  mood: ['minimal', 'professional'],
  industry: ['saas'],
  visualStyles: ['glassmorphism'],
  jsx: '...',
  tailwindClasses: { root: 'px-6 py-3 bg-blue-600 ...' },
  // ... full snippet data
});
```

## Integration with ML Pipeline

The extracted data feeds into UIForge's existing ML training pipeline:

1. **Feedback System**: Positive scores boost component recommendations
2. **Pattern Detection**: Identifies reusable code patterns
3. **Embeddings**: Semantic search for similar designs
4. **Component Registry**: High-quality designs become new snippets

## Privacy & Security

- ✅ **No Image Storage**: Images are analyzed in-memory and immediately discarded
- ✅ **Structured Data Only**: Only colors, typography, component types, etc. are stored
- ✅ **Zero External APIs**: All processing happens locally
- ✅ **Privacy-Friendly**: No PII or sensitive data stored
- ✅ **GDPR Compliant**: No personal data retention

## Use Cases

### 1. Learning from Design References

```typescript
// User provides a screenshot of a well-designed dashboard
analyze_design_image_for_training({
  image_data: "base64_screenshot",
  description: "Modern SaaS dashboard with clean design",
  component_name: "InspirationDashboard"
})
// → AI learns color palette, typography, layout patterns
```

### 2. Building Training Dataset

```typescript
// Analyze multiple design references to build a rich dataset
for (const design of designReferences) {
  analyze_design_image_for_training({
    image_data: design.imageData,
    description: design.description,
    component_name: design.name
  })
}
// → AI learns from diverse design patterns
```

### 3. Extracting Design Systems

```typescript
// Extract design system from a screenshot
analyze_design_image_for_training({
  image_data: "base64_design_system",
  description: "Company design system with buttons, cards, forms",
  component_name: "CompanyDesignSystem"
})
// → AI learns company-specific design patterns
```

### 4. Improving Recommendations

```typescript
// After analyzing multiple designs, the AI improves recommendations
generate_ui_component({
  component_type: "button",
  mood: "professional",
  industry: "saas"
})
// → AI uses learned patterns to generate better components
```

## Limitations

1. **Current Implementation**: Uses description-based analysis and sample code generation
2. **Future Enhancement**: Will integrate with actual vision AI for image-to-code conversion
3. **Quality Threshold**: Only designs with quality score ≥ 0.6 are added to component registry
4. **Pattern Extraction**: Simplified skeleton generation (will be enhanced with AST parsing)

## Future Enhancements

1. **Vision AI Integration**: Use Claude Vision or GPT-4V for actual image analysis
2. **Advanced Pattern Detection**: AST-based code pattern extraction
3. **Similarity Clustering**: Group similar designs for pattern reinforcement
4. **Active Learning**: Prioritize analysis of designs that fill knowledge gaps
5. **Design System Extraction**: Automatically extract complete design systems from screenshots

## Example Workflow

```bash
# 1. User provides a screenshot of a well-designed UI
# 2. MCP tool analyzes the image
# 3. Extracts: colors, typography, components, layout, style
# 4. Converts to training data format
# 5. Stores in database (feedback, patterns, snippets)
# 6. Image is discarded
# 7. AI now uses learned patterns for better recommendations
```

## Testing

```bash
# Run tests for the new feature
npm test -- --testPathPattern="image-design-analyzer|design-to-training-data"
```

## Summary

The Image-to-Training-Data feature enables UIForge MCP to learn from real UI designs without storing images. It extracts structured design patterns, converts them into ML training data, and feeds them into the existing training pipeline. This improves AI recommendations over time while maintaining privacy and zero-cost operation.

**Key Takeaway**: Send images → Extract patterns → Store structured data → Discard images → Improve AI

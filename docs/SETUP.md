# UIForge MCP Setup Guide

## 🚀 Quick Start

### Option 1: NPX (Recommended for Development)

```bash
npx -y uiforge-mcp@latest
```

### Option 2: Docker (Recommended for Production)

```bash
docker run --rm -i uiforge-mcp:latest
```

### Option 3: Local Development

```bash
git clone https://github.com/LucasSantana-Dev/uiforge-mcp.git
cd uiforge-mcp
npm install
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Required
FIGMA_ACCESS_TOKEN=your_figma_token_here

# Optional
NODE_ENV=production
LOG_LEVEL=info
```

#### Getting Figma Token

1. Go to [Figma Settings](https://www.figma.com/developers/api#access-tokens)
2. Click "Generate new token"
3. Copy the token and add it to your `.env` file

### MCP Configuration

Add to your MCP client configuration (e.g., Windsurf):

#### NPX Configuration

```json
{
  "mcpServers": {
    "uiforge-mcp": {
      "command": "npx",
      "args": ["-y", "uiforge-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_figma_token",
        "NODE_ENV": "production"
      }
    }
  }
}
```

#### Docker Configuration

```json
{
  "mcpServers": {
    "uiforge-mcp": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "FIGMA_ACCESS_TOKEN",
        "-v",
        "/path/to/.env:/app/.env:ro",
        "uiforge-mcp:latest"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 22+
- npm or yarn
- Git
- Figma account (for design integration)

### Local Development

1. **Clone Repository**

```bash
git clone https://github.com/LucasSantana-Dev/uiforge-mcp.git
cd uiforge-mcp
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up Environment**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run Tests**

```bash
npm test
```

5. **Build Project**

```bash
npm run build
```

6. **Start Development Server**

```bash
npm run dev
```

### Docker Development

1. **Build Docker Image**

```bash
npm run docker:build
```

2. **Run Docker Container**

```bash
npm run docker:run
```

3. **Development with Docker**

```bash
docker run --rm -i \
  -v $(pwd):/app \
  -v /app/node_modules \
  -e FIGMA_ACCESS_TOKEN \
  uiforge-mcp:dev
```

## 🔌 IDE Integration

### Windsurf IDE

1. Open MCP configuration: `~/.codeium/windsurf/mcp_config.json`
2. Add your preferred configuration (see above)
3. Restart Windsurf
4. Tools will appear in the tools panel

### Cursor IDE

1. Open MCP settings
2. Add configuration
3. Restart Cursor

### VS Code (with MCP Extension)

1. Install MCP extension
2. Configure MCP servers
3. Reload VS Code

## 📊 Available Tools

### 🏗️ **Generation Tools**

- `generate_ui_component` - Create UI components
- `scaffold_full_application` - Generate complete applications
- `generate_prototype` - Create interactive prototypes
- `generate_design_image` - Generate design mockups
- `generate_page_template` - Create page templates

### 🎨 **Design Tools**

- `fetch_design_inspiration` - Get design inspiration
- `analyze_design_references` - Analyze design patterns
- `figma_context_parser` - Extract Figma tokens
- `figma_push_variables` - Push variables to Figma
- `image_to_component` - Convert images to components

### 🔍 **Quality Tools**

- `refine_component` - Refine existing components
- `audit_accessibility` - Audit accessibility compliance
- `submit_feedback` - Submit generation feedback
- `analyze_design_image_for_training` - Analyze for ML training
- `manage_training` - Manage ML training data

### 📚 **Resources**

- `current-styles` - Access current design context

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test Suite

```bash
npm test -- --testNamePattern="generate_ui_component"
```

### Watch Mode

```bash
npm run test:watch
```

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Build Docker Image

```bash
npm run docker:build
```

### Publish to NPM

```bash
npm publish
```

### Deploy Docker Image

```bash
docker push uiforge-mcp:latest
```

## 🔒 Security Setup

### GitHub Secrets

For CI/CD integration, configure these secrets:

- `SNYK_TOKEN` - Snyk API token for security scanning
- `CODECOV_TOKEN` - Codecov upload token for coverage reporting
- `NPM_TOKEN` - npm automation token for publishing
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token

### Security Scanning

```bash
# Run Snyk locally
npx snyk test --severity-threshold=high

# Run security tests
npm run test:security
```

## 📈 Monitoring

### Health Check

```bash
# Test server health
curl -f http://localhost:8026/health || echo "Server not running"
```

### Logs

```bash
# View logs
npm run logs

# Follow logs
npm run logs:follow
```

### Metrics

```bash
# Generate performance report
npm run metrics
```

## 🛠️ Troubleshooting

### Common Issues

**Permission Denied (Docker)**

```bash
sudo usermod -aG docker $USER
newgrp docker
```

**NPX Cache Issues**

```bash
npx --clear-cache
```

**Figma Token Not Working**

- Verify token permissions
- Check token hasn't expired
- Ensure token is in environment variables

**Build Failures**

```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build
```

**Test Failures**

```bash
# Clean test environment
npm run clean
npm test
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=uiforge:* npm start

# Verbose mode
npm start --verbose
```

## 📚 Additional Resources

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Reference](https://github.com/LucasSantana-Dev/uiforge-mcp#api-reference)
- [Examples](https://github.com/LucasSantana-Dev/uiforge-mcp/tree/main/examples)
- [Community](https://github.com/LucasSantana-Dev/uiforge-mcp/discussions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

**Need help?**

- Check [Issues](https://github.com/LucasSantana-Dev/uiforge-mcp/issues)
- Join
  [Discussions](https://github.com/LucasSantana-Dev/uiforge-mcp/discussions)
- Review [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)

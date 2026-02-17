# IDE Setup Guide for UIForge MCP

This guide explains how to set up the UIForge MCP server in your IDE with dynamic environment variable support.

## 🚀 Quick Setup

### 1. Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env
```

### 2. Required Environment Variables

```bash
# Required for Figma integration
FIGMA_ACCESS_TOKEN=your_figma_access_token_here

# Optional: Environment mode
NODE_ENV=development

# Optional: Log level
LOG_LEVEL=debug
```

## 🔧 IDE Configuration

### VS Code

1. **Install recommended extensions:**
   - TypeScript and JavaScript Language Features
   - ESLint
   - Prettier
   - Thunder Client (for API testing)

2. **Create launch configuration** (`.vscode/launch.json`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug UIForge MCP",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/dist/index.js",
      "envFile": "${workspaceFolder}/.env",
      "console": "integratedTerminal",
      "restart": true,
      "runtimeExecutable": "node"
    }
  ]
}
```

3. **Create tasks configuration** (`.vscode/tasks.json`):

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build UIForge MCP",
      "type": "npm",
      "script": "build",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "silent",
        "focus": false,
        "panel": "shared",
        "showReuseMessage": true,
        "clear": false
      },
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "Start UIForge MCP",
      "type": "npm",
      "script": "start",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared",
        "showReuseMessage": true,
        "clear": false
      },
      "dependsOn": "Build UIForge MCP"
    }
  ]
}
```

### Cursor IDE

1. **Environment Setup:**
   - Cursor automatically loads `.env` files
   - Set environment variables in `.cursorrules`:

```cursorrules
# UIForge MCP Environment
environment.loadEnv: true
environment.envFile: .env
Set FIGMA_ACCESS_TOKEN for Figma integration
```

### Windsurf IDE

1. **Environment Variables:**
   - Windsurf automatically detects `.env` files
   - Variables are loaded when the MCP server starts

2. **Project Setup:**
   - The `.windsurf/` configuration already includes MCP development rules
   - Environment variables are automatically available during development

## 🔐 Dynamic Variable Passing

### Method 1: Environment File (Recommended)

Create `.env` with your variables:

```bash
# For development
FIGMA_ACCESS_TOKEN=figd_xxx123
NODE_ENV=development
LOG_LEVEL=debug

# For production
FIGMA_ACCESS_TOKEN=figd_yyy456
NODE_ENV=production
LOG_LEVEL=info
```

### Method 2: Command Line Override

```bash
# Override specific variables
FIGMA_ACCESS_TOKEN=your_token node dist/index.js

# Multiple variables
FIGMA_ACCESS_TOKEN=your_token NODE_ENV=development node dist/index.js
```

### Method 3: IDE Launch Configuration

Most IDEs support environment variable injection:

**VS Code:**
```json
{
  "environment": {
    "FIGMA_ACCESS_TOKEN": "your_token_here"
  }
}
```

**Cursor:**
```json
{
  "env": {
    "FIGMA_ACCESS_TOKEN": "your_token_here"
  }
}
```

## 🧪 Testing Environment Variables

### Verify Figma Integration

```bash
# Test if token is loaded (source .env first)
source .env && node -e "console.log('FIGMA_ACCESS_TOKEN:', process.env.FIGMA_ACCESS_TOKEN ? '✅ Set' : '❌ Not set')"

# Alternative using dotenv-cli
npx dotenv -e .env -- node -e "console.log('FIGMA_ACCESS_TOKEN:', process.env.FIGMA_ACCESS_TOKEN ? '✅ Set' : '❌ Not set')"
```

### Test MCP Server with Environment

```bash
# Start with environment variables
FIGMA_ACCESS_TOKEN=your_token node dist/index.js

# Test Figma tool
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "figma_context_parser", "arguments": {"file_key": "test"}}}' | node dist/index.js
```

## 📋 Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `FIGMA_ACCESS_TOKEN` | Yes (for Figma tools) | - | Figma API access token |
| `NODE_ENV` | No | `production` | Node environment mode |
| `LOG_LEVEL` | No | `info` | Logging level (debug, info, warn, error) |

## 🔍 Troubleshooting

### Common Issues

1. **FIGMA_ACCESS_TOKEN not found:**
   ```bash
   # Check if .env file exists
   ls -la .env

   # Verify token is set
   grep FIGMA_ACCESS_TOKEN .env
   ```

2. **Environment not loading in IDE:**
   - Restart your IDE after creating `.env`
   - Check IDE-specific environment variable settings
   - Verify `.env` file is in project root

3. **Figma API errors:**
   - Verify token is valid and not expired
   - Check Figma API rate limits (2,000 req/hour free tier)
   - Ensure token has proper permissions

### Debug Mode

Enable debug logging to troubleshoot:

```bash
# Set debug log level
LOG_LEVEL=debug node dist/index.js
```

## 🚀 Production Deployment

### Docker with Environment Variables

```dockerfile
# Dockerfile
ENV NODE_ENV=production
ENV LOG_LEVEL=info

# Pass secrets at runtime (never bake into image)
docker run -e FIGMA_ACCESS_TOKEN=your_token uiforge-mcp
```

### Docker Compose

```yaml
# docker-compose.yml
services:
  uiforge:
    build: .
    environment:
      - FIGMA_ACCESS_TOKEN=${FIGMA_ACCESS_TOKEN}
      - NODE_ENV=production
      - LOG_LEVEL=info
    env_file:
      - .env
```

## 📚 Additional Resources

- [Figma API Documentation](https://www.figma.com/developers/api)
- [Environment Variables Best Practices](https://12factor.net/config)
- [MCP Server Documentation](https://modelcontextprotocol.io)

---

**💡 Tip**: Always keep your `.env` file out of version control (add it to `.gitignore`) and use `.env.example` as a template for team members.

# UIForge MCP Server Setup Guide

## Overview

UIForge MCP server can be configured to run using standard MCP patterns: Docker
containers or NPX commands. This guide shows you how to set up both approaches.

## Option 1: Docker Configuration (Recommended)

### MCP Configuration

Add this to your Windsurf MCP configuration
(`~/.codeium/windsurf/mcp_config.json`):

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
        "/Users/lucassantana/Desenvolvimento/uiforge-mcp/.env:/app/.env:ro",
        "uiforge-mcp:latest"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Build Docker Image

```bash
cd /Users/lucassantana/Desenvolvimento/uiforge-mcp
npm run docker:build
```

### Benefits of Docker

- ✅ **Isolated Environment** - No dependency conflicts
- ✅ **Consistent** - Same environment everywhere
- ✅ **Secure** - Containerized execution
- ✅ **Portable** - Works on any system with Docker

## Option 2: NPX Configuration

### MCP Configuration

Add this to your Windsurf MCP configuration
(`~/.codeium/windsurf/mcp_config.json`):

```json
{
  "mcpServers": {
    "uiforge-mcp": {
      "command": "npx",
      "args": ["-y", "uiforge-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token-here",
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Local Development NPX

For local development with NPX:

```json
{
  "mcpServers": {
    "uiforge-mcp": {
      "command": "npx",
      "args": ["uiforge-mcp"],
      "cwd": "/Users/lucassantana/Desenvolvimento/uiforge-mcp",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Benefits of NPX

- ✅ **Simple Setup** - No Docker required
- ✅ **Auto-Updates** - Always uses latest version
- ✅ **Lightweight** - No container overhead
- ✅ **Direct Access** - Uses local files directly

## Option 3: Hybrid (Docker for Production, NPX for Development)

### Development (NPX)

```json
{
  "mcpServers": {
    "uiforge-mcp-dev": {
      "command": "npx",
      "args": ["uiforge-mcp"],
      "cwd": "/Users/lucassantana/Desenvolvimento/uiforge-mcp",
      "env": { "NODE_ENV": "development" }
    }
  }
}
```

### Production (Docker)

```json
{
  "mcpServers": {
    "uiforge-mcp-prod": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "FIGMA_ACCESS_TOKEN",
        "-v",
        "/Users/lucassantana/Desenvolvimento/uiforge-mcp/.env:/app/.env:ro",
        "uiforge-mcp:latest"
      ],
      "env": { "NODE_ENV": "production" }
    }
  }
}
```

## Environment Variables

### Required Variables

- `FIGMA_ACCESS_TOKEN` - Your Figma API token
- `NODE_ENV` - Set to `production` for production use

### Optional Variables

- `LOG_LEVEL` - Logging level (default: `info`)
- `PORT` - Server port (default: MCP stdio)

## Setup Steps

### 1. Prepare Environment

```bash
cd /Users/lucassantana/Desenvolvimento/uiforge-mcp

# Ensure .env file exists with FIGMA_ACCESS_TOKEN
cp .env.example .env
# Edit .env and add your token
```

### 2. Build and Test

```bash
# Build project
npm run build

# Test locally
npm start

# For Docker
npm run docker:build
npm run docker:run
```

### 3. Configure Windsurf

1. Open `/Users/lucassantana/.codeium/windsurf/mcp_config.json`
2. Add your preferred configuration (Docker or NPX)
3. Save the file
4. Restart Windsurf

### 4. Verify Connection

In Windsurf, you should see these tools:

- `generate_ui_component` - Create components
- `scaffold_full_application` - Generate apps
- `analyze_design_image_for_training` - Analyze designs
- `figma_context_parser` - Extract Figma tokens
- And 9+ more tools

## Troubleshooting

### Docker Issues

```bash
# Check if Docker is running
docker --version

# Rebuild image
docker build -t uiforge-mcp:latest .

# Test container
docker run --rm -i uiforge-mcp:latest
```

### NPX Issues

```bash
# Clear npx cache
npx --clear-cache

# Force latest version
npx -y uiforge-mcp@latest

# Local development
cd /path/to/uiforge-mcp
npm run build
npx .
```

### Permission Issues

```bash
# Fix Docker permissions (macOS/Linux)
sudo usermod -aG docker $USER

# Or use sudo for Docker
sudo docker run --rm -i uiforge-mcp:latest
```

## Best Practices

### Production Use

- Use Docker for consistency and security
- Pin to specific version: `uiforge-mcp@0.4.1`
- Set proper environment variables
- Use volume mounts for configuration

### Development Use

- Use NPX for convenience
- Use local source code: `cwd` parameter
- Enable development logging
- Use watch mode: `npm run dev`

### Security

- Never commit API tokens to version control
- Use read-only volume mounts: `:ro`
- Use non-root user in Docker (already configured)
- Keep dependencies updated

## Quick Start Commands

```bash
# Quick Docker setup
npm run docker:build
# Add Docker config to Windsurf
# Restart Windsurf

# Quick NPX setup
npm run build
# Add NPX config to Windsurf
# Restart Windsurf

# Test locally
npm start
```

Choose the option that best fits your workflow. Docker is recommended for
production and consistency, while NPX is great for development and simplicity.

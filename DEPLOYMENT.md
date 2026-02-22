# UIForge MCP Deployment Guide

## Overview

UIForge MCP can be deployed and used without cloning the repository using
standard Docker or NPX commands.

## 🚀 Quick Deployment Options

### Option 1: Docker (Production Recommended)

#### Pull and Run (No Clone Required)

```bash
# Pull the latest image
docker pull uiforge-mcp:latest

# Run with environment variables
docker run -i \
  -e FIGMA_ACCESS_TOKEN=your_token_here \
  uiforge-mcp:latest
```

#### MCP Configuration

Add to your IDE's MCP configuration:

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
        "uiforge-mcp:latest"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Option 2: NPX (Easiest Setup)

#### Direct Execution (No Clone Required)

```bash
# Run directly with NPX
npx -y uiforge-mcp@latest

# Or with environment variables
FIGMA_ACCESS_TOKEN=your_token npx -y uiforge-mcp@latest
```

#### MCP Configuration

```json
{
  "mcpServers": {
    "uiforge-mcp": {
      "command": "npx",
      "args": ["-y", "uiforge-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_figma_token_here",
        "NODE_ENV": "production"
      }
    }
  }
}
```

## 📦 Publishing to NPM

To make the NPX option available, publish to npm:

```bash
# Build the project
npm run build

# Publish to npm
npm publish
```

The package includes:

- `bin.uiforge-mcp` - Executable entry point
- `files` - Only includes necessary `dist/` folder
- `prepublishOnly` - Builds automatically before publishing

## 🔧 Environment Setup

### Required Variables

| Variable             | Description     | Source                                                               |
| -------------------- | --------------- | -------------------------------------------------------------------- |
| `FIGMA_ACCESS_TOKEN` | Figma API token | [Figma Settings](https://www.figma.com/developers/api#access-tokens) |

### Optional Variables

| Variable    | Default      | Description      |
| ----------- | ------------ | ---------------- |
| `NODE_ENV`  | `production` | Environment mode |
| `LOG_LEVEL` | `info`       | Logging level    |

## 🐳 Docker Deployment

### Production Docker Compose

```yaml
version: '3.8'
services:
  uiforge-mcp:
    image: uiforge-mcp:latest
    container_name: uiforge-mcp
    restart: unless-stopped
    environment:
      - FIGMA_ACCESS_TOKEN=${FIGMA_ACCESS_TOKEN}
      - NODE_ENV=production
    volumes:
      - ./logs:/app/logs
```

### Docker Build from Source

```bash
# Clone repository
git clone https://github.com/LucasSantana-Dev/uiforge-mcp.git
cd uiforge-mcp

# Build image
docker build -t uiforge-mcp:local .

# Run local image
docker run -i \
  -e FIGMA_ACCESS_TOKEN=your_token \
  uiforge-mcp:local
```

## 🔌 IDE Integration

### Windsurf

1. Open `/Users/lucassantana/.codeium/windsurf/mcp_config.json`
2. Add your preferred configuration (Docker or NPX)
3. Restart Windsurf

### Cursor IDE

1. Open `.cursorrules` or MCP settings
2. Add the configuration
3. Restart Cursor

### VS Code (with MCP extension)

1. Open MCP settings
2. Add the configuration
3. Reload VS Code

## 🌐 Network Deployment

### Cloud Deployment

The Docker image can be deployed to any cloud platform:

#### AWS ECS

```bash
# Push to ECR
aws ecr create-repository --repository-name uiforge-mcp
docker tag uiforge-mcp:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/uiforge-mcp:latest
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/uiforge-mcp:latest
```

#### Google Cloud Run

```bash
# Deploy to Cloud Run
gcloud run deploy uiforge-mcp \
  --image uiforge-mcp:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars FIGMA_ACCESS_TOKEN=$FIGMA_ACCESS_TOKEN
```

#### Azure Container Instances

```bash
# Deploy to ACI
az container create \
  --resource-group uiforge-rg \
  --name uiforge-mcp \
  --image uiforge-mcp:latest \
  --environment-variables FIGMA_ACCESS_TOKEN=$FIGMA_ACCESS_TOKEN
```

## 📊 Monitoring and Logging

### Health Check

The Docker image includes a health check:

```bash
# Test health
docker run --rm uiforge-mcp:latest node -e "process.exit(0)"
```

### Logs

```bash
# View logs
docker logs uiforge-mcp

# Follow logs
docker logs -f uiforge-mcp
```

## 🔒 Security Considerations

### Environment Variables

- Never commit API tokens to version control
- Use Docker secrets or Kubernetes secrets in production
- Consider using environment-specific configuration files

### Container Security

- Runs as non-root user (`nodejs`)
- Minimal Alpine Linux base image
- Read-only file system where possible

## 🚀 Performance Optimization

### Resource Requirements

- **CPU**: 1 core minimum, 2 cores recommended
- **Memory**: 512MB minimum, 1GB recommended
- **Disk**: 100MB for image + logs

### Scaling

- Stateless design allows horizontal scaling
- Use load balancer for multiple instances
- Consider CDN for static assets

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy UIForge MCP
on:
  push:
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          docker build -t uiforge-mcp:${{ github.ref_name }} .
          docker tag uiforge-mcp:${{ github.ref_name }} uiforge-mcp:latest

      - name: Push to Docker Hub
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push uiforge-mcp:${{ github.ref_name }}
          docker push uiforge-mcp:latest

      - name: Publish to NPM
        run: |
          echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > ~/.npmrc
          npm publish
```

## 📋 Verification Checklist

- [ ] Docker image builds successfully
- [ ] NPX command executes without errors
- [ ] All 13 MCP tools are available
- [ ] Figma integration works with valid token
- [ ] Environment variables are properly loaded
- [ ] Health check passes
- [ ] Logs are properly formatted

## 🆘 Troubleshooting

### Common Issues

**NPX fails to find package:**

```bash
# Clear NPX cache
npx --clear-cache

# Use specific version
npx -y uiforge-mcp@0.4.1
```

**Docker permission denied:**

```bash
# Fix Docker permissions
sudo usermod -aG docker $USER
newgrp docker
```

**Figma token not working:**

- Verify token has correct permissions
- Check token hasn't expired
- Ensure token is set in environment variables

**MCP server not starting:**

- Check Node.js version (requires >=22)
- Verify all dependencies are installed
- Check logs for error messages

## 📞 Support

- **Documentation**: [README.md](./README.md)
- **MCP Guide**: [MCP_SETUP_GUIDE.md](./MCP_SETUP_GUIDE.md)
- **Issues**:
  [GitHub Issues](https://github.com/LucasSantana-Dev/uiforge-mcp/issues)
- **Discussions**:
  [GitHub Discussions](https://github.com/LucasSantana-Dev/uiforge-mcp/discussions)

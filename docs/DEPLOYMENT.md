# Deployment Guide

This document describes the deployment process for UIForge MCP, including automated workflows and manual procedures.

## 🚀 Automated Deployment (GitHub Actions)

### Prerequisites

1. **Repository Secrets** (configured in GitHub repository settings):
   - `NPM_TOKEN`: npm automation token with publish permissions
   - `DOCKER_USERNAME`: Docker Hub username
   - `DOCKER_PASSWORD`: Docker Hub access token

2. **Branch Protection**:
   - Deployment can only run from `main` branch
   - Clean working directory required

3. **Version Management**:
   - Uses semantic versioning (patch/minor/major)
   - Automatic Git tagging
   - GitHub release creation

### Workflow Trigger

The deployment workflow is triggered manually via `workflow_dispatch`:

```bash
# In GitHub UI: Actions > Deploy > Run workflow
```

**Parameters:**
- **Version Type**: `patch` | `minor` | `major` (default: patch)
- **Dry Run**: Skip actual npm publish (default: false)
- **Create Release**: Generate GitHub release (default: true)

### Workflow Stages

#### 1. Pre-flight Checks
- Verify main branch
- Check for uncommitted changes
- Calculate next version
- Validate package.json
- Check for existing version tags

#### 2. Quality Assurance
- Full validation (lint, format, typecheck, test)
- Coverage threshold check (80% minimum)
- Security audit
- Package size validation
- Binary validation

#### 3. Build Artifacts
- Compile TypeScript
- Generate package hash
- Create npm package
- Upload as artifact

#### 4. Docker Build
- Multi-platform build (amd64, arm64)
- Push to Docker Hub
- Test container startup
- Size validation

#### 5. Publish to npm
- Download package artifact
- Publish with provenance
- Verify installation

#### 6. Create Release
- Generate changelog
- Create GitHub release
- Attach package artifact

#### 7. Update Version
- Update package.json
- Commit and tag
- Push to main

### Environment Variables

The workflow uses these environment variables:

```yaml
# GitHub Actions (built-in)
GITHUB_TOKEN: GitHub API token
GITHUB_REF: Current branch/tag
GITHUB_SHA: Commit hash

# Secrets (repository-level)
NPM_TOKEN: npm automation token
DOCKER_USERNAME: Docker Hub username
DOCKER_PASSWORD: Docker Hub access token
```

## 📦 Manual Deployment

### Local Publishing

For testing or emergency deployments:

```bash
# 1. Update version
npm version patch  # or minor/major

# 2. Run full validation
npm run validate:all

# 3. Build package
npm run build

# 4. Publish to npm
npm publish --access public

# 5. Create Git tag
git push origin main --follow-tags
```

### Docker Publishing

```bash
# 1. Build image
docker build -t lucassantana/uiforge-mcp:latest .

# 2. Tag with version
docker tag lucassantana/uiforge-mcp:latest lucassantana/uiforge-mcp:v0.4.2

# 3. Push to Docker Hub
docker push lucassantana/uiforge-mcp:latest
docker push lucassantana/uiforge-mcp:v0.4.2
```

## 🔧 Configuration

### Package.json Scripts

Key scripts used in deployment:

```json
{
  "scripts": {
    "validate": "npm run lint && npm run format:check && npx tsc --noEmit && npm test && npm run build",
    "validate:all": "npm run lint; npm run format:check; npx tsc --noEmit; npm test; npm run build",
    "build": "tsc",
    "test:coverage": "NODE_OPTIONS=--experimental-vm-modules jest --coverage",
    "prepublishOnly": "npm run build"
  }
}
```

### GitHub Actions Configuration

The workflow uses these key actions:

- `actions/checkout@v4`: Repository checkout
- `actions/setup-node@v4`: Node.js setup
- `docker/setup-buildx-action@v3`: Docker buildx
- `docker/login-action@v3`: Docker login
- `docker/metadata-action@v5`: Docker metadata
- `docker/build-push-action@v5`: Docker build/push
- `actions/upload-artifact@v4`: Artifact upload
- `actions/download-artifact@v4`: Artifact download
- `actions/create-release@v1`: GitHub release

## 📊 Quality Gates

### Code Quality

- **ESLint**: All linting rules must pass
- **Prettier**: Code formatting must be consistent
- **TypeScript**: No type errors allowed
- **Tests**: 100% test pass rate required

### Coverage Requirements

- **Minimum Coverage**: 80% line coverage
- **Warning Threshold**: Below 80% triggers warning
- **Coverage Report**: Generated and uploaded to Codecov

### Security

- **npm audit**: Runs with moderate level
- **Vulnerabilities**: Reviewed before publishing
- **Provenance**: Enabled for npm packages

### Package Size

- **Warning Threshold**: > 1MB package size
- **Docker Image**: Monitored for size (> 500MB warning)

## 🚨 Troubleshooting

### Common Issues

#### 1. "Working directory is not clean"
```bash
git status
git add .
git commit -m "chore: prepare for deployment"
```

#### 2. "Version already exists"
```bash
git tag -l | grep "v0.4.2"
# If tag exists locally but not remotely:
git push origin --delete v0.4.2
git tag -d v0.4.2
```

#### 3. "npm publish requires OTP"
- Check `NPM_TOKEN` has correct permissions
- Ensure 2FA is properly configured
- Use automation token (not personal token)

#### 4. "Docker push failed"
- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD`
- Check Docker Hub permissions
- Ensure image name is correct

### Rollback Procedure

If deployment fails:

1. **npm Package**:
   ```bash
   npm deprecate uiforge-mcp@0.4.2 "Deployment issue, use previous version"
   ```

2. **Docker Image**:
   ```bash
   docker pull lucassantana/uiforge-mcp:previous-tag
   docker tag lucassantana/uiforge-mcp:previous-tag lucassantana/uiforge-mcp:latest
   docker push lucassantana/uiforge-mcp:latest
   ```

3. **Git Tag**:
   ```bash
   git tag -d v0.4.2
   git push origin --delete v0.4.2
   ```

## 📈 Monitoring

### Post-Deployment Checks

1. **npm Package**:
   ```bash
   npm view uiforge-mcp@0.4.2
   npm info uiforge-mcp
   ```

2. **Docker Image**:
   ```bash
   docker pull lucassantana/uiforge-mcp:v0.4.2
   docker run --rm lucassantana/uiforge-mcp:v0.4.2 --help
   ```

3. **GitHub Release**:
   - Check release notes
   - Verify attached artifacts
   - Confirm tag creation

### Analytics

- **npm Downloads**: Monitor via npmjs.com
- **Docker Pulls**: Monitor via Docker Hub
- **GitHub Stars**: Track repository growth
- **Issues**: Monitor for deployment-related issues

## 🔄 Continuous Improvement

### Workflow Enhancements

- Add integration tests
- Implement canary deployments
- Add performance benchmarks
- Include dependency updates

### Automation Opportunities

- Automatic version bumping
- Scheduled security updates
- Performance monitoring
- Usage analytics collection

## 📚 References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releases)

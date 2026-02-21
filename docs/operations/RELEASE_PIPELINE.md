# Automated Release Pipeline - UIForge MCP

This document describes the automated release pipeline for the `@forgespace/ui-mcp` package.

## Overview

The release pipeline automatically publishes new versions when release branches are merged into the main branch. This ensures consistent, high-quality releases with proper versioning and documentation.

## Release Process

### 1. Create a Release Branch

Create a release branch following the pattern `release/X.Y.Z` where X.Y.Z follows semantic versioning:

```bash
# Create a new release branch for version 0.6.0
git checkout -b release/0.6.0
```

### 2. Make Changes and Test

Make your changes on the release branch, ensuring:

- All tests pass
- Code is properly formatted
- Security scans pass
- Documentation is updated
- CHANGELOG.md is updated with release notes

### 3. Merge Release Branch

Create a pull request from `release/0.6.0` to `main`:

```bash
git push origin release/0.6.0
```

The PR will be validated by the branch protection workflow.

### 4. Automated Release

Once the PR is merged to main, the automated release pipeline will:

1. **Detect Release Merge**: Identify that a release branch was merged
2. **Trigger Deploy Workflow**: Use repository dispatch to trigger the existing deploy workflow
3. **Update CHANGELOG**: Add release notes to CHANGELOG.md
4. **Run Quality Checks**: Execute full test suite, linting, and security scans
5. **Build Package**: Create npm package and Docker image
6. **Publish to npm**: Publish the package with provenance
7. **Create GitHub Release**: Generate a tagged GitHub release
8. **Notify Teams**: Send success/failure notifications

## Branch Naming Convention

Release branches must follow the pattern: `release/X.Y.Z`

- **X**: Major version (breaking changes)
- **Y**: Minor version (new features)
- **Z**: Patch version (bug fixes)

Examples:
- `release/0.6.0` - Minor release with new features
- `release/0.5.1` - Patch release with bug fixes
- `release/1.0.0` - Major release with breaking changes

## Quality Gates

The pipeline includes several quality gates:

### Pre-Merge Validation
- Branch name validation
- Version format checking
- Duplicate version prevention
- PR description requirements
- Test coverage suggestions

### Pre-Release Validation
- Full test suite execution
- Security vulnerability scanning
- Build verification
- Dependency validation
- Breaking change detection

### Post-Release Actions
- npm package publishing
- Docker image building and publishing
- GitHub release creation
- Team notifications

## Manual Overrides

### Emergency Releases

For emergency releases, you can:

1. **Manual Deploy**: Use the existing deploy workflow manually:
   - Go to Actions tab
   - Run "Deploy" workflow manually
   - Select version type and options

2. **Direct Publishing**: Use npm directly:
   ```bash
   npm version 0.5.2
   npm publish --access public
   ```

### Failed Releases

If a release fails:

1. **Check Logs**: Review the workflow logs in GitHub Actions
2. **Fix Issues**: Address any failing quality gates
3. **Retry**: Push a new commit to trigger the pipeline again
4. **Manual Override**: Use manual publishing if needed

## Environment Variables

The pipeline uses these secrets:

- `NPM_TOKEN`: npm publishing token
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `GITHUB_TOKEN`: GitHub API token (automatically provided)

## Troubleshooting

### Common Issues

**Release not detected**: Ensure the commit message indicates a release branch merge or the tag follows the pattern `release/X.Y.Z`.

**Version conflicts**: Check that the version doesn't already exist and follows semantic versioning.

**Publishing failures**: Verify the NPM_TOKEN has the correct permissions and the package name is available.

**Docker build failures**: Check Dockerfile and build configuration.

**Security scan failures**: Review and address any security vulnerabilities before proceeding.

### Debugging

1. **Check Workflow Logs**: Go to Actions tab in GitHub
2. **Review Failed Steps**: Identify which quality gate failed
3. **Local Testing**: Run the same checks locally:
   ```bash
   npm test
   npm run lint:check
   npm run build
   npm audit --audit-level high
   ```

## Best Practices

### Before Creating Release Branch

1. **Ensure Main is Stable**: Main branch should be in a good state
2. **Update Dependencies**: All dependencies should be up to date
3. **Complete Features**: All intended features should be implemented
4. **Write Tests**: Ensure adequate test coverage

### During Release Development

1. **Semantic Versioning**: Follow semantic versioning guidelines
2. **CHANGELOG Updates**: Update CHANGELOG.md with user-facing changes
3. **Documentation**: Update relevant documentation
4. **Breaking Changes**: Document breaking changes clearly

### After Release

1. **Monitor Issues**: Watch for any post-release issues
2. **User Communication**: Communicate changes to users
3. **Next Planning**: Plan for the next release cycle

## Release Notes Template

When updating CHANGELOG.md, use this format:

```markdown
## [0.6.0] - 2026-02-18

### Added
- New feature description
- Another new feature

### Changed
- Updated existing functionality
- Modified behavior

### Fixed
- Bug fix description
- Another bug fix

### Deprecated
- Feature being deprecated (with migration path)

### Removed
- Removed feature (with breaking change notice)

### Security
- Security vulnerability fix

### Documentation
- Updated documentation
- Added new guides
```

## Integration with Forge Ecosystem

This release pipeline integrates with:

- **@forgespace/core**: Shared patterns and configurations
- **MCP Gateway**: Automatic deployment of updated MCP services
- **Docker Hub**: Automatic image publishing
- **npm Registry**: Automatic package publishing

The pipeline ensures that all ecosystem components remain compatible with each release.

## Workflow Files

- `release-automation.yml`: Detects release branch merges and triggers deployment
- `deploy.yml`: Handles the actual deployment and publishing process
- `branch-protection.yml`: Validates release branches and enforces PR requirements

## Monitoring and Notifications

The pipeline provides comprehensive notifications:

- **GitHub Actions**: Real-time workflow status
- **GitHub Releases**: Automatic release creation with changelog
- **npm Registry**: Package publishing confirmation
- **Docker Hub**: Image publishing confirmation

## Security Considerations

- All packages are published with npm provenance
- Docker images are built with security scanning
- Dependencies are audited before publishing
- Access tokens are properly secured
- Branch protection rules prevent unauthorized releases
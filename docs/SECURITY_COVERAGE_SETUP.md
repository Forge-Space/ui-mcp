# Codecov and Snyk Integration Setup Guide

This guide walks you through setting up Codecov and Snyk integrations for
UIForge MCP.

## 🚀 Quick Setup

### 1. Run Admin Setup Workflow

1. Go to **GitHub Actions** tab
2. Select **"Setup Deployment"** workflow
3. Click **"Run workflow"**
4. Configure inputs:
   - ✅ `setup_snyk`: Enable Snyk token setup
   - ✅ `setup_codecov`: Enable Codecov token setup
   - ✅ `verify_configuration`: Check existing setup
5. Click **"Run workflow"**

### 2. Create Snyk Token

The workflow will guide you through:

1. Go to https://app.snyk.io/login
2. Navigate to **Account Settings → API Token**
3. Click **"Generate Token"**
4. Copy the token
5. Add it as a repository secret named `SNYK_TOKEN`

### 3. Create Codecov Token

1. Go to https://codecov.io/
2. Sign in with your GitHub account
3. Select your repository
4. Go to **Settings → Repository Upload Token**
5. Copy the token
6. Add it as a repository secret named `CODECOV_TOKEN`

## 🔧 Manual Token Setup

### GitHub Repository Secrets

Go to: https://github.com/YOUR_USERNAME/uiforge-mcp/settings/secrets/actions

#### Required Secrets:

1. **SNYK_TOKEN**
   - Source: https://app.snyk.io/account
   - Purpose: Security scanning for dependencies and code
   - Permissions: Read access to Snyk API

2. **CODECOV_TOKEN**
   - Source: https://codecov.io/
   - Purpose: Upload coverage reports
   - Permissions: Upload coverage to Codecov

3. **NPM_TOKEN** (if not already set)
   - Source: https://www.npmjs.com/settings/tokens
   - Purpose: Package publishing
   - Type: Automation token

4. **DOCKER_USERNAME** (if not already set)
   - Source: Docker Hub username
   - Purpose: Docker image publishing

5. **DOCKER_PASSWORD** (if not already set)
   - Source: Docker Hub access token
   - Purpose: Docker image publishing

## 📊 What the Integrations Do

### Codecov Integration

- **Coverage Reporting**: Uploads coverage reports to Codecov dashboard
- **Trend Analysis**: Tracks coverage over time
- **PR Comments**: Shows coverage changes in pull requests
- **Threshold Checks**: Validates 80% coverage minimum
- **Detailed Reports**: Line, branch, function, and statement coverage

### Snyk Security Scanning

#### Dependency Scanning (`snyk-security` job)

- Scans `package-lock.json` for known vulnerabilities
- Monitors dependencies for new security issues
- Uploads results to GitHub Security tab
- Severity threshold: High and above

#### Code Security Analysis (`snyk-code-security` job)

- Static code analysis for security issues
- Detects common security patterns
- Uploads findings to GitHub Security tab
- SARIF format for detailed analysis

## 🧪 Testing the Setup

### 1. Trigger CI Workflow

```bash
# Push a small change to trigger CI
git commit --allow-empty -m "test: Trigger CI workflow"
git push origin main
```

### 2. Check Results

1. **GitHub Actions**: Monitor the CI workflow execution
2. **Codecov Dashboard**: https://codecov.io/gh/YOUR_USERNAME/uiforge-mcp
3. **GitHub Security Tab**:
   https://github.com/YOUR_USERNAME/uiforge-mcp/security

### 3. Verify Integration

#### Codecov Checks:

- ✅ Coverage report uploaded
- ✅ Coverage percentage displayed
- ✅ Trend analysis available

#### Snyk Checks:

- ✅ Dependency scan completed
- ✅ Code analysis completed
- ✅ SARIF files uploaded to Security tab

## 🔍 Troubleshooting

### Common Issues

#### 1. Snyk Token Not Working

```bash
# Verify token format
echo "SNYK_TOKEN should start with 'snk-'"
```

#### 2. Codecov Upload Failed

```bash
# Check if token is set
# Verify repository is activated on Codecov
```

#### 3. GitHub Security Tab Empty

```bash
# Check permissions
# Ensure SARIF files are generated
```

### Debug Commands

#### Local Testing

```bash
# Test coverage locally
npm run test:coverage

# Check coverage files
ls -la coverage/

# Test Snyk locally (requires token)
npx snyk test --severity-threshold=high
```

#### Workflow Debugging

```bash
# Check workflow logs
# Look for SARIF file generation
# Verify secret access
```

## 📈 Benefits

### Security Benefits

- **Early Detection**: Find vulnerabilities before deployment
- **Continuous Monitoring**: Automated scanning on every PR
- **GitHub Integration**: Native security experience
- **Detailed Reports**: Comprehensive vulnerability information

### Coverage Benefits

- **Quality Metrics**: Track code coverage trends
- **PR Insights**: Coverage changes in pull requests
- **Threshold Enforcement**: Minimum coverage requirements
- **Team Visibility**: Shared coverage dashboard

## 🔄 Maintenance

### Regular Tasks

1. **Review Security Findings**: Address high-severity issues
2. **Monitor Coverage Trends**: Improve test coverage
3. **Update Dependencies**: Keep dependencies secure
4. **Review Reports**: Check for false positives

### Configuration Updates

- Adjust severity thresholds as needed
- Update coverage thresholds
- Add new security rules
- Configure notification preferences

## 📚 Additional Resources

- [Codecov Documentation](https://docs.codecov.com/)
- [Snyk Documentation](https://support.snyk.io/hc/en-us)
- [GitHub Security Features](https://docs.github.com/en/code-security)
- [SARIF Format](https://sarifweb.azurewebsites.net/)

## 🆘 Support

For issues with the integrations:

1. Check GitHub Actions logs
2. Review service documentation
3. Verify token configuration
4. Check repository permissions

---

_This setup provides comprehensive security scanning and coverage reporting for
the UIForge MCP project._

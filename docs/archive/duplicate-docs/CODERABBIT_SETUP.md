# CodeRabbit Setup Guide

This guide explains how to use CodeRabbit for AI-powered code reviews across
GitHub, IDE, and CLI.

## Overview

CodeRabbit is configured via `.coderabbit.yaml` in the repository root. This
configuration applies to:

- **GitHub PR Reviews**: Automatic reviews on pull requests
- **IDE Extension**: Real-time feedback in your editor
- **CLI Tool**: Terminal-based code reviews

---

## 1. GitHub Integration

### Setup

1. **Install CodeRabbit GitHub App**
   - Visit: https://github.com/apps/coderabbitai
   - Click "Install" and select this repository
   - Grant necessary permissions

2. **Automatic Reviews**
   - CodeRabbit automatically reviews all new PRs
   - Reviews trigger on new commits to existing PRs
   - Configuration is read from `.coderabbit.yaml`

### Using CodeRabbit on GitHub

**In Pull Requests:**

- **Get Summary**: Add `@coderabbitai summary` to PR description
- **Auto-generate Title**: Add `@coderabbitai` to PR title
- **Request Review**: `@coderabbitai review`
- **Ask Questions**: `@coderabbitai explain this code`
- **Get Configuration**: `@coderabbitai configuration`

**Review Features:**

- High-level summary and walkthrough
- Line-by-line code review comments
- Security and performance suggestions
- Test coverage analysis
- Suggested labels and reviewers
- Related issues and PRs
- Code review effort estimation

---

## 2. IDE Extension

### Installation

**VS Code:**

```bash
# Install from VS Code Marketplace
code --install-extension coderabbitai.coderabbit
```

Or search "CodeRabbit" in VS Code Extensions panel.

**JetBrains IDEs** (IntelliJ, WebStorm, PyCharm):

- Go to Settings → Plugins
- Search for "CodeRabbit"
- Install and restart IDE

### Configuration

1. Open IDE settings
2. Search for "CodeRabbit"
3. Sign in with your GitHub account
4. Extension will use `.coderabbit.yaml` from repository

### Using CodeRabbit in IDE

**Features:**

- Real-time code suggestions as you type
- Inline code explanations
- Refactoring suggestions
- Security vulnerability detection
- Best practices recommendations

**Commands:**

- Right-click on code → "CodeRabbit: Review Selection"
- Cmd/Ctrl+Shift+P → "CodeRabbit: Review Current File"
- Hover over code for inline suggestions

---

## 3. CLI Tool

### Installation

**macOS/Linux:**

```bash
curl -fsSL https://cli.coderabbit.ai/install.sh | sh
```

**Windows (WSL):**

```bash
# In WSL terminal
curl -fsSL https://cli.coderabbit.ai/install.sh | sh
```

**Manual Installation:**

```bash
# Download binary
wget https://cli.coderabbit.ai/latest/coderabbit-cli-linux-amd64
chmod +x coderabbit-cli-linux-amd64
sudo mv coderabbit-cli-linux-amd64 /usr/local/bin/coderabbit
```

### Authentication

```bash
# Login with GitHub
coderabbit auth login

# Verify authentication
coderabbit auth status
```

### Using CodeRabbit CLI

**Review Commands:**

```bash
# Review current changes (git diff)
coderabbit review

# Review specific files
coderabbit review src/tools/new-tool.ts

# Review entire directory
coderabbit review src/lib/

# Review with custom instructions
coderabbit review --instructions "Focus on security and performance"

# Review staged changes
coderabbit review --staged

# Review specific commit
coderabbit review --commit abc123

# Review PR
coderabbit review --pr 42
```

**Chat Commands:**

```bash
# Ask questions about code
coderabbit chat "Explain this function"

# Get suggestions
coderabbit chat "How can I improve this code?"

# Interactive chat mode
coderabbit chat --interactive
```

**Configuration Commands:**

```bash
# Show current configuration
coderabbit config show

# Validate .coderabbit.yaml
coderabbit config validate

# Generate configuration template
coderabbit config init
```

**Other Commands:**

```bash
# Check CLI version
coderabbit version

# Update CLI
coderabbit update

# View help
coderabbit --help
coderabbit review --help
```

---

## Configuration Reference

### Current Configuration Highlights

Our `.coderabbit.yaml` is configured with:

**Review Profile**: `assertive` (thorough feedback)

**Enabled Features:**

- ✅ High-level summaries in walkthrough
- ✅ Sequence diagrams for complex changes
- ✅ Code review effort estimation
- ✅ Linked issue assessment
- ✅ Related issues and PRs detection
- ✅ Suggested labels (with custom rules)
- ✅ Suggested reviewers
- ✅ AI agent prompts for codegen
- ✅ Commit status updates

**Enabled Tools:**

- ESLint (JavaScript/TypeScript)
- Markdownlint (Documentation)
- Hadolint (Dockerfile)
- Yamllint (YAML files)
- Gitleaks (Secret detection)
- Actionlint (GitHub Actions)
- Shellcheck (Shell scripts)
- LanguageTool (Grammar/spelling)

**Path-Specific Instructions:**

- `src/tools/**/*.ts` - MCP tool implementation guidelines
- `src/lib/**/*.ts` - Library module best practices
- `src/__tests__/**/*.test.ts` - Test quality standards
- `Dockerfile` - Docker security and optimization
- `.github/workflows/**/*.yml` - CI/CD best practices
- `**/*.md` - Documentation quality checks

**Custom Labels:**

- `enhancement`, `bug`, `documentation`, `dependencies`
- `performance`, `testing`, `docker`, `ci/cd`
- `breaking-change`

---

## Workflow Integration

### Pre-commit Hook

Add CodeRabbit CLI to your pre-commit workflow:

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run CodeRabbit review on staged changes
coderabbit review --staged --exit-code

# Continue with other checks
npm run lint
npm test
```

### CI/CD Integration

Add CodeRabbit to GitHub Actions:

```yaml
# .github/workflows/coderabbit.yml
name: CodeRabbit Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: CodeRabbit Review
        uses: coderabbitai/coderabbit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

### Local Development Workflow

```bash
# 1. Make changes
git add src/tools/new-feature.ts

# 2. Review before commit
coderabbit review --staged

# 3. Address feedback and commit
git commit -m "feat: add new feature"

# 4. Review entire PR before pushing
coderabbit review --pr

# 5. Push and let GitHub integration handle PR review
git push origin feature-branch
```

---

## Best Practices

### For GitHub PRs

1. **Use Placeholders**: Add `@coderabbitai summary` to PR description template
2. **Respond to Feedback**: Reply to CodeRabbit comments with questions
3. **Resolve Discussions**: Mark CodeRabbit suggestions as resolved when
   addressed
4. **Request Re-review**: Use `@coderabbitai review` after making changes

### For IDE Usage

1. **Enable Auto-save**: Get real-time feedback as you code
2. **Review Before Commit**: Use "Review Current File" before staging
3. **Ask Questions**: Use chat feature to understand suggestions
4. **Configure Shortcuts**: Set up keyboard shortcuts for common actions

### For CLI Usage

1. **Review Often**: Run `coderabbit review` frequently during development
2. **Use Staged Review**: Review changes before committing
3. **Custom Instructions**: Use `--instructions` for specific concerns
4. **Interactive Mode**: Use chat mode for exploratory questions

---

## Troubleshooting

### GitHub Integration

**Issue**: CodeRabbit not reviewing PRs

- **Solution**: Check GitHub App installation and permissions
- Verify `.coderabbit.yaml` is valid: `coderabbit config validate`
- Check PR is not a draft (if `drafts: false` in config)

**Issue**: Reviews are too verbose

- **Solution**: Change `profile: "assertive"` to `profile: "chill"` in
  `.coderabbit.yaml`

### IDE Extension

**Issue**: Extension not working

- **Solution**:
  - Verify authentication: Check IDE settings
  - Restart IDE after installation
  - Check extension logs for errors

**Issue**: Slow performance

- **Solution**:
  - Disable real-time suggestions in settings
  - Use manual review commands instead

### CLI Tool

**Issue**: `coderabbit: command not found`

- **Solution**:
  - Verify installation: `which coderabbit`
  - Add to PATH: `export PATH="$HOME/.coderabbit/bin:$PATH"`
  - Reinstall: `curl -fsSL https://cli.coderabbit.ai/install.sh | sh`

**Issue**: Authentication failed

- **Solution**:
  - Re-authenticate: `coderabbit auth login`
  - Check GitHub token permissions
  - Clear auth cache: `rm -rf ~/.coderabbit/auth`

**Issue**: Review taking too long

- **Solution**:
  - Review specific files instead of entire repo
  - Use `--staged` to review only staged changes
  - Check network connection

---

## Resources

- **Documentation**: https://docs.coderabbit.ai
- **CLI Docs**: https://docs.coderabbit.ai/cli
- **GitHub App**: https://github.com/apps/coderabbitai
- **VS Code Extension**:
  https://marketplace.visualstudio.com/items?itemName=coderabbitai.coderabbit
- **Configuration Schema**: https://coderabbit.ai/integrations/schema.v2.json
- **Support**: support@coderabbit.ai
- **Discord**: https://discord.gg/coderabbit

---

## Project-Specific Notes

### UIForge MCP Context

When reviewing code for this project, keep in mind:

- **MCP Server**: This is a Model Context Protocol server
- **TypeScript/ESM**: Uses NodeNext module resolution
- **Testing**: Jest (not Vitest), 84%+ coverage required
- **Logging**: Pino for structured logging
- **Docker**: Alpine-based images
- **Tools**: All must be registered in `src/index.ts`
- **Design Context**: Singleton store pattern
- **Frameworks**: Supports React, Next.js, Vue, Angular
- **External APIs**: Figma (requires token), Playwright, Sharp

### Review Focus Areas

CodeRabbit is configured to pay special attention to:

1. **MCP Tool Implementation** - Proper SDK usage, schema validation
2. **Test Coverage** - Maintaining thresholds, edge cases
3. **Security** - Secret detection, dependency vulnerabilities
4. **Performance** - Build optimization, bundle size
5. **Documentation** - Accuracy, completeness, examples
6. **Docker** - Security, layer caching, health checks
7. **CI/CD** - Workflow optimization, caching strategies

---

## Quick Reference

```bash
# GitHub PR Commands
@coderabbitai summary          # Generate PR summary
@coderabbitai review           # Request full review
@coderabbitai explain          # Explain specific code
@coderabbitai configuration    # Show current config

# CLI Commands
coderabbit review              # Review current changes
coderabbit review --staged     # Review staged changes
coderabbit chat "question"     # Ask questions
coderabbit config validate     # Validate configuration

# IDE Commands
Cmd/Ctrl+Shift+P → CodeRabbit  # Open command palette
Right-click → CodeRabbit        # Context menu options
```

---

**Last Updated**: February 14, 2026  
**Configuration File**: `.coderabbit.yaml`  
**Version**: CodeRabbit v2 Schema

# UIForge Shared GitHub Package

## 📦 Overview

This directory contains centralized GitHub configurations, workflows, templates,
and scripts shared across all UIForge projects. This package ensures
consistency, reduces duplication, and simplifies maintenance across the entire
UIForge ecosystem.

## 🗂️ Directory Structure

```
.github/shared/
├── workflows/          # Reusable GitHub Actions workflows
│   ├── base-ci.yml          # Comprehensive base CI/CD pipeline
│   ├── base-ci-simple.yml   # Simplified CI pipeline
│   └── security-scan.yml    # Security scanning workflow
├── configs/            # Configuration files
│   ├── renovate.json5       # Renovate dependency management
│   ├── codecov.yml          # Codecov coverage reporting
│   ├── codeql-config.yml    # CodeQL security analysis
│   └── branch-protection.yml # Branch protection rules
├── scripts/            # Shared utility scripts
│   └── mcp-wrapper.sh       # Unified MCP wrapper script
└── templates/          # GitHub templates
    ├── pr-template-master.md     # Master PR template
    ├── issue-template-bug.md     # Bug report template
    ├── issue-template-feature.md # Feature request template
    └── project-setup/            # Project-specific setup guides
        └── gateway.md              # Gateway project setup
```

## 🔄 Usage Instructions

### For New Projects

1. **Copy the shared package**:

   ```bash
   # Clone the shared package to your project
   cp -r /path/to/uiforge-shared/.github/shared ./github/
   ```

2. **Adapt configurations**:
   - Update project-specific values in configs
   - Customize workflows for project needs
   - Adjust templates for project context

3. **Set up references**:
   - Create symlinks or copies in appropriate locations
   - Update workflow references to use shared workflows

### For Existing Projects

1. **Migrate to shared package**:
   - Backup current configurations
   - Replace with shared versions
   - Update customizations as needed

2. **Update references**:
   - Modify workflows to use shared templates
   - Update script paths
   - Test all configurations

## 🛠️ Configuration Details

### Workflows

#### Base CI/CD (`workflows/base-ci.yml`)

- **Purpose**: Comprehensive CI/CD pipeline for all project types
- **Features**: Linting, testing, building, security scanning
- **Inputs**: Project type, Node.js/Python versions, feature toggles
- **Usage**: Reference as reusable workflow in project CI

#### Security Scanning (`workflows/security-scan.yml`)

- **Purpose**: Multi-tool security vulnerability scanning
- **Tools**: npm audit, CodeQL, Trufflehog, GitGuardian
- **Schedule**: Daily scans + event-driven
- **Usage**: Standalone or integrated into CI pipeline

### Configurations

#### Renovate (`configs/renovate.json5`)

- **Purpose**: Automated dependency management
- **Features**: Auto-merge, semantic commits, vulnerability alerts
- **Schedule**: Weekly updates (Monday 3AM UTC)
- **Customization**: Project-specific rules and groups

#### Codecov (`configs/codecov.yml`)

- **Purpose**: Code coverage reporting and thresholds
- **Threshold**: 80% minimum coverage
- **Features**: Multi-format reporting, PR comments
- **Integration**: GitHub Actions and CI pipelines

#### Branch Protection (`configs/branch-protection.yml`)

- **Purpose**: Git branch protection rules
- **Rules**: Tiered protection for main, release, dev, feature branches
- **Features**: Required reviewers, status checks, force push restrictions
- **Implementation**: Apply via GitHub repository settings

### Scripts

#### MCP Wrapper (`scripts/mcp-wrapper.sh`)

- **Purpose**: Unified MCP server connection script
- **Support**: Cursor and MCP Client configurations
- **Features**: JWT authentication, Docker container execution
- **Usage**: `./scripts/mcp-wrapper.sh [cursor|mcp-client]`

### Templates

#### PR Template (`templates/pr-template-master.md`)

- **Purpose**: Comprehensive pull request template
- **Sections**: Problem statement, solution, testing, security, documentation
- **Customization**: Project-specific sections and requirements
- **Integration**: Place as `.github/PULL_REQUEST_TEMPLATE.md`

#### Issue Templates

- **Bug Report**: Structured bug reporting with reproduction steps
- **Feature Request**: Comprehensive feature proposal with acceptance criteria
- **Usage**: Place in `.github/ISSUE_TEMPLATE/` directory

## 🔧 Customization Guidelines

### Project-Specific Adaptations

1. **Environment Variables**:

   ```yaml
   env:
     NODE_VERSION: '22'
     PYTHON_VERSION: '3.12'
     COVERAGE_THRESHOLD: '80'
   ```

2. **Workflow Inputs**:

   ```yaml
   uses: ./.github/shared/workflows/base-ci.yml
   with:
     project-type: 'gateway'
     enable-docker: true
     enable-security: true
   ```

3. **Configuration Overrides**:
   - Copy shared config to project location
   - Modify project-specific values
   - Keep shared version as reference

### Maintenance Procedures

1. **Updates to Shared Package**:
   - Test changes in a pilot project first
   - Update documentation
   - Communicate changes to all projects

2. **Version Management**:
   - Tag shared package versions
   - Maintain compatibility matrix
   - Document breaking changes

3. **Quality Assurance**:
   - Test all workflows and configurations
   - Validate template rendering
   - Check script functionality

## 📋 Implementation Checklist

### Setup Verification

- [ ] Shared package copied to project
- [ ] Workflows reference shared templates
- [ ] Configurations adapted for project
- [ ] Scripts executable and functional
- [ ] Templates placed in correct locations

### Testing Validation

- [ ] CI/CD pipeline runs successfully
- [ ] Security scans execute properly
- [ ] Dependency management works
- [ ] Scripts function as expected
- [ ] Templates render correctly

### Documentation Updates

- [ ] Project README references shared package
- [ ] Setup instructions updated
- [ ] Customization documented
- [ ] Maintenance procedures established

## 🚀 Benefits

### Consistency

- Standardized patterns across all projects
- Unified security and quality standards
- Consistent development workflows

### Maintainability

- Single source of truth for configurations
- Reduced duplication and maintenance overhead
- Centralized updates and improvements

### Developer Experience

- Familiar patterns across projects
- Reduced setup time for new projects
- Clear documentation and guidelines

### Quality Assurance

- Tested and validated configurations
- Security best practices built-in
- Automated quality gates and checks

## 🔄 Migration Guide

### From Existing Configurations

1. **Backup Current Setup**:

   ```bash
   mkdir -p .github/backup
   cp -r .github/workflows .github/backup/
   cp -r .github/configs .github/backup/ 2>/dev/null || true
   ```

2. **Install Shared Package**:

   ```bash
   # Copy shared package
   cp -r /path/to/shared/.github/shared .github/

   # Create symlinks for commonly used files
   ln -s .github/shared/configs/renovate.json5 .github/renovate.yml
   ```

3. **Update References**:
   - Modify workflow files to use shared templates
   - Update script paths in documentation
   - Test all functionality

4. **Clean Up Old Files**:
   ```bash
   # Remove old duplicates (after verification)
   rm -rf .github/workflows/base-ci.yml
   rm -rf .github/configs/
   ```

### Validation Steps

1. **Run CI Pipeline**: Ensure all jobs pass
2. **Test Security Scans**: Verify security tools work
3. **Check Dependencies**: Confirm Renovate functions
4. **Validate Scripts**: Test MCP wrapper and utilities
5. **Review Templates**: Ensure PR/issue templates work

## 📞 Support and Troubleshooting

### Common Issues

1. **Workflow Path Errors**:
   - Verify relative paths are correct
   - Check workflow file permissions
   - Ensure shared package structure is intact

2. **Configuration Conflicts**:
   - Review project-specific overrides
   - Check for duplicate configurations
   - Validate YAML syntax

3. **Script Execution Failures**:
   - Verify script permissions (`chmod +x`)
   - Check dependency availability
   - Review environment variables

### Getting Help

1. **Documentation**: Review this README and template documentation
2. **Examples**: Check reference implementations in other UIForge projects
3. **Issues**: Report problems in the shared package repository
4. **Community**: Consult UIForge development team for guidance

## 📈 Future Enhancements

### Planned Improvements

1. **Automation**:
   - Script for automatic shared package updates
   - GitHub App for configuration synchronization
   - Automated testing across all projects

2. **Expansion**:
   - Additional workflow templates
   - More configuration options
   - Enhanced script utilities

3. **Integration**:
   - CI/CD pipeline for shared package
   - Automated dependency updates
   - Cross-project testing matrix

### Contribution Guidelines

1. **Changes**: Test in multiple project types before submission
2. **Documentation**: Update README and relevant docs
3. **Compatibility**: Maintain backward compatibility when possible
4. **Quality**: Follow established patterns and standards

---

**Version**: 1.0.0 **Last Updated**: 2025-02-17 **Maintainer**: UIForge
Development Team **License**: MIT

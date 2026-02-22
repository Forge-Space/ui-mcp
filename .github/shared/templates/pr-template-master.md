# Pull Request Template - UIForge Projects

## 🎯 Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to
      not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Security improvement
- [ ] Refactoring (no functional changes)
- [ ] Other (please describe):

## 📝 Description

<!--
  Provide a clear and concise description of the changes.
  Include the problem being solved and the approach taken.
  For bugs: describe the issue and how it's fixed
  For features: describe the new functionality and its benefits
-->

## 🧪 Testing Performed

- [ ] Unit tests pass locally (`npm test` / `pytest`)
- [ ] Integration tests pass locally
- [ ] Manual testing completed
- [ ] Performance testing (if applicable)
- [ ] Security testing (if applicable)
- [ ] Cross-browser compatibility (webapp only)
- [ ] Mobile responsiveness (webapp only)

### Test Details

<!--
  Describe what tests were run and their results.
  Include any test files added or modified.
-->

## 🔒 Security Considerations

- [ ] No new security vulnerabilities introduced
- [ ] Secrets and credentials properly managed
- [ ] Input validation implemented where needed
- [ ] Dependencies reviewed for security issues
- [ ] Authentication/authorization tested (if applicable)

### Security Details

<!--
  Describe any security-related changes or considerations.
  Include any new dependencies and their security review.
-->

## 📊 Performance Impact

- [ ] No performance regression
- [ ] Performance improvements verified
- [ ] Bundle size impact assessed (webapp only)
- [ ] Memory usage reviewed
- [ ] Database performance tested (if applicable)

### Performance Details

<!--
  Describe any performance-related changes.
  Include benchmarks or measurements if available.
-->

## 📚 Documentation Updates

- [ ] README.md updated
- [ ] API documentation updated
- [ ] CHANGELOG.md updated
- [ ] PROJECT_CONTEXT.md updated (mcp-gateway only)
- [ ] Inline code documentation updated
- [ ] User-facing documentation updated

### Documentation Details

<!--
  Describe what documentation was updated.
  Include links to relevant documentation files.
-->

## 🚨 Breaking Changes

<!--
  If this PR contains breaking changes, please describe them here.
  Include migration steps for existing users.
-->

## 📦 Dependencies

<!--
  List any new dependencies added and their purpose.
  Include version numbers and reasoning for the addition.
-->

### New Dependencies

-

### Updated Dependencies

-

## 🔧 Configuration Changes

<!--
  Describe any configuration changes required.
  Include environment variables, build settings, etc.
-->

## 🎨 UI/UX Changes (Conditional)

<!--
  This section is only relevant for uiforge-webapp
  Complete if this PR contains UI changes
-->

- [ ] Component library used correctly
- [ ] Accessibility standards met
- [ ] Responsive design implemented
- [ ] User experience tested
- [ ] Design system tokens used

### UI Changes Details

<!--
  Describe UI/UX changes and their rationale.
  Include screenshots or links to designs if available.
-->

## 🔌 MCP Integration (Conditional)

<!--
  This section is only relevant for mcp-gateway and uiforge-mcp
  Complete if this PR contains MCP-related changes
-->

- [ ] MCP protocol compliance verified
- [ ] Tool registration tested
- [ ] Server lifecycle tested
- [ ] Error handling implemented
- [ ] Documentation updated

### MCP Changes Details

<!--
  Describe MCP-specific changes.
  Include tool definitions, server configurations, etc.
-->

## 🗄️ Database Changes (Conditional)

<!--
  This section is only relevant for projects with databases
  Complete if this PR contains database changes
-->

- [ ] Migration scripts created
- [ ] Migration tested on development
- [ ] Rollback procedures documented
- [ ] Data integrity verified
- [ ] Performance impact assessed

### Database Changes Details

<!--
  Describe database schema changes.
  Include migration files and their purpose.
-->

## 🚀 Deployment Considerations

- [ ] Deployment process tested
- [ ] Environment variables documented
- [ ] Health checks updated
- [ ] Monitoring requirements identified
- [ ] Rollback procedures tested

### Deployment Details

<!--
  Describe any deployment-related changes.
  Include environment-specific requirements.
-->

## ✅ Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is properly commented where necessary
- [ ] Changes generate no new warnings
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No breaking changes without proper documentation
- [ ] Security review completed (if applicable)

## 🔗 Related Issues

<!--
  Link any related issues or pull requests.
  Use GitHub issue numbers and PR numbers.
-->

- Closes #
- Related to #

## 📸 Screenshots (Optional)

<!--
  Add screenshots for UI changes if applicable.
  Drag and drop images here or use markdown image syntax.
-->

## 💬 Additional Context

<!--
  Add any other context about the pull request here.
  Include any questions for reviewers or special considerations.
-->

---

## 📋 Review Guidelines

### For Reviewers

1. **Functionality**: Does the change work as intended?
2. **Testing**: Are tests comprehensive and appropriate?
3. **Security**: Are security implications properly addressed?
4. **Performance**: Is performance impact acceptable?
5. **Documentation**: Is documentation clear and complete?
6. **Breaking Changes**: Are breaking changes properly documented?

### Review Categories

- **🔧 Code Quality**: Style, structure, maintainability
- **🧪 Testing**: Coverage, test quality, edge cases
- **🔒 Security**: Vulnerabilities, input validation, secrets
- **📊 Performance**: Efficiency, resource usage, bottlenecks
- **📚 Documentation**: Clarity, completeness, accuracy
- **🚀 Deployment**: Impact on deployment process

### Approval Criteria

- [ ] All functional requirements met
- [ ] Tests are comprehensive and passing
- [ ] Security considerations addressed
- [ ] Performance impact acceptable
- [ ] Documentation updated and accurate
- [ ] No breaking changes without proper migration

---

_This template is part of the UIForge shared GitHub patterns standardization._

# Branching Strategy Guide

This document describes the Trunk Based Development (TBD) branching strategy used for UIForge MCP.

## 🌳 Branch Types

### Main Branch (`main`)
- **Always deployable** and reflects production state
- Protected from direct pushes
- Only receives merges from release branches
- Automatically triggers deployment when updated

### Release Branches (`release/vX.Y.Z`)
- **Integration and stabilization** branch
- Created from main when starting a release cycle
- Receives merges from feature branches
- Can receive hotfixes and emergency fixes
- Merged to main when ready for deployment

### Feature Branches (`feature/feature-name` or `feature/JIRA-123-description`)
- **Short-lived** branches (1-3 days)
- Created from main for new features or bug fixes
- Frequent pushes and small commits
- Merged to release branch when complete

## 🔄 Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# Develop and test
# ... make changes ...
git add .
git commit -m "feat: add user authentication"
git push origin feature/user-authentication
```

### 2. Feature Integration
```bash
# Create PR from feature branch to release branch
# Target: release/v1.0.0
# Code review and automated checks must pass

# Merge feature branch to release branch
git checkout release/v1.0.0
git pull origin release/v1.0.0
git merge feature/user-authentication
git push origin release/v1.0.0

# Delete feature branch
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

### 3. Release Preparation
```bash
# Create release branch from main
git checkout main
git pull origin main
git checkout -b release/v1.0.0
git push origin release/v1.0.0

# Integrate multiple features
# (repeat step 2 for each feature)

# Stabilization and testing
# ... integration tests, bug fixes, etc. ...
```

### 4. Release Deployment
```bash
# Merge release branch to main
git checkout main
git pull origin main
git merge release/v1.0.0
git push origin main

# Tag the release
git tag v1.0.0
git push origin v1.0.0

# Delete release branch (optional)
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

## 🛡️ Branch Protection Rules

### Main Branch
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require up-to-date branches before merging
- ✅ Do not allow force pushes
- ✅ Do not allow deletions

### Release Branches
- ✅ Require pull request reviews (from feature branches)
- ✅ Allow force pushes (for hotfixes)
- ✅ Allow deletions (after deployment)

### Feature Branches
- ❌ No protection rules
- ✅ Encourage frequent pushes

## 🚀 Release Cadence

### Major Releases
- **Frequency**: Every 2-4 weeks
- **Branch**: `release/vX.0.0`
- **Content**: Major features, breaking changes

### Minor Releases
- **Frequency**: Weekly or bi-weekly
- **Branch**: `release/vX.Y.0`
- **Content**: New features, enhancements

### Patch Releases
- **Frequency**: As needed
- **Branch**: Can be hotfixes directly to main
- **Content**: Bug fixes, security updates

## 📋 Naming Conventions

### Feature Branches
- `feature/user-authentication`
- `feature/JIRA-123-add-login`
- `feature/fix-memory-leak`

### Release Branches
- `release/v1.0.0`
- `release/v1.1.0`
- `release/v2.0.0`

### Tags
- `v1.0.0`
- `v1.0.1`
- `v2.0.0`

## 🎯 Best Practices

### Feature Branches
- Keep them **short-lived** (1-3 days max)
- Make **small, focused commits**
- **Push frequently** to avoid conflicts
- Write **clear commit messages**
- Delete after merge

### Release Branches
- Use for **integration testing**
- **Stabilize** before merging to main
- Can receive **hotfixes**
- Tag before deletion

### Main Branch
- Always **deployable**
- **Never broken**
- Use **semantic versioning** for tags
- **Automated deployment** on merge

## 🔄 Continuous Integration

All branches trigger CI/CD pipelines:

- **Feature branches**: Run tests, linting, and build
- **Release branches**: Full validation including integration tests
- **Main branch**: Build, test, and deploy to production

## 🚨 Emergency Procedures

### Hotfix to Production
```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# Fix the issue
# ... make changes ...
git commit -m "fix: critical security vulnerability"
git push origin hotfix/critical-bug-fix

# Merge directly to main (bypass release branch)
git checkout main
git merge hotfix/critical-bug-fix
git push origin main

# Tag and deploy
git tag v1.0.1
git push origin v1.0.1

# Clean up
git branch -d hotfix/critical-bug-fix
git push origin --delete hotfix/critical-bug-fix
```

### Rollback
```bash
# Revert problematic merge
git checkout main
git revert --no-edit <merge-commit-hash>
git push origin main

# Tag rollback version
git tag v1.0.2
git push origin v1.0.2
```

## 📚 References

- [Trunk Based Development](https://trunkbaseddevelopment.com/)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Semantic Versioning](https://semver.org/)
- [Git Flow vs Trunk Based Development](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-vs-trunk-based-development)

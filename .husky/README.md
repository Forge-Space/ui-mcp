# Git Hooks Configuration

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/) to ensure code quality and prevent CI/CD pipeline failures.

## 🎯 Purpose

All validations that run in the CI/CD pipeline are now enforced **locally before commits and pushes**. This prevents:
- ❌ Failed pipeline builds on remote
- ❌ Broken code being pushed to main/PR branches
- ❌ Wasted CI/CD minutes
- ❌ Blocking other team members

## 🔒 Active Hooks

### `pre-commit` - Fast Local Validation
Runs on every `git commit` and validates:

1. **Lint & Format** (staged files only via lint-staged)
   - ESLint with auto-fix
   - Prettier formatting
   - TypeScript type checking

2. **Type Check** (full project)
   - `tsc --noEmit` to catch type errors

3. **Tests** (related tests only)
   - Runs tests related to changed files
   - Fast feedback loop

4. **Build Verification**
   - Ensures `npm run build` succeeds
   - Verifies `dist/index.js` output exists

**If any check fails, the commit is blocked.**

### `pre-push` - Complete CI/CD Simulation
Runs on every `git push` and validates:

- **Full Validation Suite** (`npm run validate`)
  - Complete linting (all files)
  - Format checking (all files)
  - Type checking (full project)
  - All tests (full suite)

**If validation fails, the push is blocked.**

## 🚀 Usage

### Normal Workflow
```bash
# Make changes
git add .

# Commit triggers pre-commit hook
git commit -m "feat: add new feature"
# ✅ Runs: lint-staged → type check → tests → build

# Push triggers pre-push hook
git push
# ✅ Runs: full validation suite
```

### Skipping Hooks (Emergency Only)
```bash
# Skip pre-commit (NOT recommended)
git commit --no-verify -m "emergency fix"

# Skip pre-push (NOT recommended)
git push --no-verify
```

⚠️ **Warning:** Skipping hooks may cause CI/CD failures. Only use in emergencies.

## 📊 What Gets Validated

| Check | Pre-Commit | Pre-Push | CI/CD Pipeline |
|-------|-----------|----------|----------------|
| ESLint | ✅ (staged) | ✅ (all) | ✅ |
| Prettier | ✅ (staged) | ✅ (all) | ✅ |
| TypeScript | ✅ (full) | ✅ (full) | ✅ |
| Tests | ✅ (related) | ✅ (all) | ✅ |
| Build | ✅ | ✅ | ✅ |

## 🔧 Configuration Files

- **`.husky/pre-commit`** - Pre-commit hook script
- **`.husky/pre-push`** - Pre-push hook script
- **`package.json`** - lint-staged configuration
- **`.github/workflows/ci.yml`** - CI/CD pipeline (reference)

## 🛠️ Troubleshooting

### Hook Not Running
```bash
# Reinstall Husky hooks
npm run prepare
```

### Permission Denied
```bash
# Make hooks executable
chmod +x .husky/pre-commit .husky/pre-push
```

### Slow Pre-Commit
The pre-commit hook runs tests only for changed files. If it's still slow:
- Consider using `git commit --no-verify` for WIP commits
- Use `git push` for full validation before sharing code

### False Positives
If a check fails incorrectly:
1. Run the failing command manually to debug
2. Fix the underlying issue
3. Update the hook if needed

## 📝 Maintenance

### Adding New Checks
1. Update `.husky/pre-commit` or `.husky/pre-push`
2. Ensure the check exists in `package.json` scripts
3. Test with a dummy commit/push
4. Update this README

### Removing Checks
1. Remove from hook files
2. Test to ensure no breakage
3. Update this README

## 🎓 Best Practices

✅ **DO:**
- Run `npm run validate` before creating PRs
- Fix issues locally instead of pushing and waiting for CI
- Keep hooks fast by using incremental checks
- Update hooks when CI/CD pipeline changes

❌ **DON'T:**
- Skip hooks unless absolutely necessary
- Commit broken code with `--no-verify`
- Ignore hook failures
- Remove validation checks without team discussion

## 📚 Related Documentation

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [CI/CD Pipeline](.github/workflows/ci.yml)
- [Contributing Guidelines](../CONTRIBUTING.md)

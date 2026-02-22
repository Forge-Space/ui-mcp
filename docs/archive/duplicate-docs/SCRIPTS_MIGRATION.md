# Scripts Migration Notice

## 🚨 Important Changes

The deployment and setup scripts have been migrated to **admin-only GitHub
workflows** for improved security and auditability.

## 📋 Migration Details

### Deprecated Scripts

- ❌ `scripts/setup-deployment.sh` → **DEPRECATED**
- ❌ `scripts/lint.js` → **DEPRECATED**

### New Admin Workflows

- ✅ `.github/workflows/setup-deployment.yml` → **REPLACEMENT**
- ✅ `.github/workflows/admin-lint.yml` → **REPLACEMENT**

## 🔧 Why This Change?

### Security Benefits

1. **Admin-only access**: Only administrators can run deployment setup
2. **Audit trail**: All actions are logged in GitHub Actions
3. **No local secrets**: No sensitive operations in local scripts
4. **Controlled access**: Repository permissions control workflow execution

### Operational Benefits

1. **Centralized management**: All admin operations in one place
2. **Consistent environment**: Same environment for all admin tasks
3. **Better logging**: Detailed logs and reports
4. **Easier maintenance**: No local script dependencies

## 🔄 How to Use New Workflows

### Setup Deployment

1. Go to **GitHub Actions** tab
2. Select **"Setup Deployment"** workflow
3. Click **"Run workflow"**
4. Configure inputs as needed
5. Follow guided instructions

### Admin Lint

1. Go to **GitHub Actions** tab
2. Select **"Admin Lint"** workflow
3. Configure lint options
4. Click **"Run workflow"**

## 📚 Documentation Updates

See the updated documentation:

- [Deployment Guide](./DEPLOYMENT.md) - Updated with new workflow instructions
- [Branching Strategy](./BRANCHING_STRATEGY.md) - TBD workflow remains the same

## ⚠️ Breaking Changes

- Local execution of `scripts/setup-deployment.sh` will no longer work
- Direct script execution is replaced by GitHub Actions workflows
- Admin permissions required for deployment setup

## 🚀 Next Steps

1. **Delete old scripts** (optional):

   ```bash
   rm scripts/setup-deployment.sh
   rm scripts/lint.js
   ```

2. **Update team documentation** to reference new workflows

3. **Test new workflows** in a safe environment

4. **Update CI/CD training** materials

## 📞 Support

For questions about the new workflows:

1. Check the [Deployment Guide](./DEPLOYMENT.md)
2. Review workflow logs in GitHub Actions
3. Contact repository administrators

---

_This migration improves security and maintainability while providing better
audit trails for deployment operations._

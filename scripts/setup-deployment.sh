#!/bin/bash

# Setup Deployment Configuration Script
# This script helps configure the necessary secrets and settings for deployment

set -euo pipefail

echo "🚀 UIForge MCP Deployment Setup"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check prerequisites
check_prerequisites() {
  echo "Checking prerequisites..."

  # Check if gh CLI is installed
  if ! command -v gh &>/dev/null; then
    print_error "GitHub CLI (gh) is not installed. Please install it first."
    echo "Visit: https://cli.github.com/manual/installation"
    exit 1
  fi
  print_success "GitHub CLI is installed"

  # Check if user is logged in to GitHub
  if ! gh auth status &>/dev/null; then
    print_error "Not logged in to GitHub CLI. Please run: gh auth login"
    exit 1
  fi
  print_success "GitHub CLI authentication is valid"

  # Check if we're in the right directory
  if [ ! -f "package.json" ] || [ ! -d ".github/workflows" ]; then
    print_error "Not in the UIForge MCP project directory"
    exit 1
  fi
  print_success "In correct project directory"

  # Check if npm is logged in
  if ! npm whoami &>/dev/null; then
    print_warning "Not logged in to npm. Please run: npm login"
    echo "This is required for publishing packages."
  else
    print_success "npm authentication is valid"
  fi
}

# Setup GitHub secrets
setup_github_secrets() {
  echo ""
  echo "Setting up GitHub secrets..."

  # Get repository info
  REPO_OWNER=$(gh repo view --json owner --jq '.owner.login')
  REPO_NAME=$(gh repo view --json name --jq '.name')

  print_info "Repository: $REPO_OWNER/$REPO_NAME"

  # Check if secrets already exist
  echo "Checking existing secrets..."

  # NPM Token
  if gh secret list --repo "$REPO_OWNER/$REPO_NAME" | grep -q "NPM_TOKEN"; then
    print_warning "NPM_TOKEN secret already exists"
  else
    echo ""
    print_info "To create NPM_TOKEN:"
    echo "1. Go to https://www.npmjs.com/settings/tokens"
    echo "2. Click 'Generate New Token'"
    echo "3. Select 'Automation' token type"
    echo "4. Copy the token"
    echo "5. Run: gh secret set NPM_TOKEN --repo $REPO_OWNER/$REPO_NAME"
    echo ""
    read -r -p "Press Enter after setting NPM_TOKEN..."
  fi

  # Docker Credentials
  if gh secret list --repo "$REPO_OWNER/$REPO_NAME" | grep -q "DOCKER_USERNAME"; then
    print_warning "Docker secrets already exist"
  else
    echo ""
    print_info "To create Docker secrets:"
    echo "1. Create a Docker Hub access token: https://hub.docker.com/settings/security"
    echo "2. Run: gh secret set DOCKER_USERNAME --repo $REPO_OWNER/$REPO_NAME"
    echo "3. Run: gh secret set DOCKER_PASSWORD --repo $REPO_OWNER/$REPO_NAME"
    echo ""
    read -r -p "Press Enter after setting Docker secrets..."
  fi
}

# Verify workflow file
verify_workflow() {
  echo ""
  echo "Verifying deployment workflow..."

  if [ -f ".github/workflows/deploy.yml" ]; then
    print_success "Deployment workflow exists"

    # Check workflow syntax
    if gh workflow view deploy --yaml &>/dev/null; then
      print_success "Workflow syntax is valid"
    else
      print_error "Workflow syntax is invalid"
      exit 1
    fi
  else
    print_error "Deployment workflow not found"
    exit 1
  fi
}

# Test local validation
test_validation() {
  echo ""
  echo "Testing local validation..."

  if npm run validate:all &>/dev/null; then
    print_success "Local validation passes"
  else
    print_error "Local validation failed"
    echo "Run 'npm run validate:all' to see the issues"
    exit 1
  fi
}

# Check branch protection
check_branch_protection() {
  echo ""
  echo "Checking branch protection..."

  # Check if main branch is protected
  if gh api "repos/$REPO_OWNER/$REPO_NAME/branches/main/protection" 2>/dev/null | grep -q "required_status_checks"; then
    print_success "Main branch has protection rules"
  else
    print_warning "Main branch is not protected"
    echo "Consider enabling branch protection for main"
    echo "Visit: https://github.com/$REPO_OWNER/$REPO_NAME/settings/branches"
  fi
}

# Show deployment instructions
show_instructions() {
  echo ""
  echo "🎉 Setup Complete!"
  echo "=================="
  echo ""
  print_info "To deploy a new version:"
  echo "1. Go to: https://github.com/$REPO_OWNER/$REPO_NAME/actions"
  echo "2. Click on 'Deploy' workflow"
  echo "3. Click 'Run workflow'"
  echo "4. Choose version type (patch/minor/major)"
  echo "5. Set dry_run to false for actual deployment"
  echo "6. Click 'Run workflow'"
  echo ""
  print_info "To test locally:"
  echo "1. Update version: npm version patch"
  echo "2. Validate: npm run validate:all"
  echo "3. Build: npm run build"
  echo "4. Test publish: npm publish --dry-run"
  echo ""
  print_info "For troubleshooting, see: docs/DEPLOYMENT.md"
}

# Main execution
main() {
  echo "This script will help you set up deployment configuration for UIForge MCP."
  echo ""

  check_prerequisites
  setup_github_secrets
  verify_workflow
  test_validation
  check_branch_protection
  show_instructions

  print_success "Deployment setup is complete!"
}

# Run main function
main "$@"

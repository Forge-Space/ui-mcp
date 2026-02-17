#!/bin/bash

# UIForge MCP IDE Setup Script
# This script helps set up the development environment

echo "🚀 Setting up UIForge MCP IDE environment..."

# Check if .env exists, if not create from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file and add your FIGMA_ACCESS_TOKEN"
    echo "   Get your token at: https://www.figma.com/developers/api#access-tokens"
else
    echo "✅ .env file already exists"
fi

# Check if VS Code is available
if command -v code &> /dev/null; then
    echo "🔧 Configuring VS Code..."
    
    # Install recommended extensions
    echo "📦 Installing VS Code extensions..."
    code --install-extension ms-vscode.vscode-typescript-next \
                  --install-extension esbenp.prettier-vscode \
                  --install-extension dbaeumer.vscode-eslint \
                  --install-extension ms-vscode.vscode-json \
                  --install-extension humao.rest-client \
                  --force
    
    echo "✅ VS Code configured with recommended extensions"
else
    echo "ℹ️  VS Code not found, skipping extension installation"
fi

# Check if Node.js dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Build the project
echo "🔨 Building UIForge MCP..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Test environment variables
echo "🔍 Testing environment variables..."
if [ -f .env ]; then
    echo "📋 Environment variables found in .env:"
    grep -v "^#" .env | grep -v "^$" || echo "   No variables set"
else
    echo "⚠️  No .env file found"
fi

echo ""
echo "🎉 IDE setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Edit .env file with your FIGMA_ACCESS_TOKEN"
echo "2. Open the project in your IDE"
echo "3. Run 'npm run dev' for development"
echo "4. Run 'npm test' to run tests"
echo "5. Check IDE-SETUP.md for detailed instructions"
echo ""
echo "🔗 Quick commands:"
echo "  npm run dev          # Start development server"
echo "  npm run build        # Build for production"
echo "  npm test             # Run tests"
echo "  npm run start         # Start MCP server"
echo ""

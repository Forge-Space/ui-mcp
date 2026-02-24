# Gateway Project Setup Guide

This template provides the setup instructions for MCP Gateway projects using the
UIForge patterns.

## 🚀 Quick Start

1. **Bootstrap the project**:

   ```bash
   ./scripts/bootstrap-project.sh gateway <project-name>
   ```

2. **Configure environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Install dependencies**:

   ```bash
   # Python dependencies
   pip install -r requirements.txt
   pip install -r apps/tool-router/requirements.txt

   # Node.js dependencies (if applicable)
   npm install
   ```

4. **Run tests**:
   ```bash
   make test
   ```

## 📁 Project Structure

```
<project-name>/
├── apps/
│   ├── tool-router/          # Python MCP tool router
│   ├── mcp-client/          # MCP client application
│   └── web-admin/           # Next.js admin interface
├── scripts/                 # Utility and bootstrap scripts
├── docker/                  # Docker configurations
├── docs/                    # Project documentation
├── .github/                 # GitHub workflows and templates
├── docker-compose.yml       # Development environment
├── Makefile                 # Build and test commands
├── pyproject.toml          # Python project configuration
└── requirements.txt        # Python dependencies
```

## 🔧 Configuration Files

### Python Configuration

- `pyproject.toml`: pytest, coverage, and tool configurations
- `requirements.txt`: Python dependencies
- `apps/tool-router/requirements.txt`: Tool router specific dependencies

### Docker Configuration

- `docker-compose.yml`: Development environment setup
- `docker/docker-compose.dev.yml`: Development overrides
- `Dockerfile.tool-router`: Tool router container

### CI/CD Configuration

- `.github/workflows/ci-shared.yml`: Shared CI workflow
- `.codecov.yml`: Coverage reporting configuration
- `renovate.json`: Dependency management

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=apps/tool-router/src --cov-report=html

# Run specific test file
pytest apps/tool-router/tests/test_router.py
```

### Integration Tests

```bash
# Run integration tests
pytest tests/integration/

# Run with specific service
pytest tests/integration/test_gateway.py
```

### Docker Tests

```bash
# Build and test Docker images
docker-compose -f docker/docker-compose.dev.yml build
docker-compose -f docker/docker-compose.dev.yml up -d
docker-compose -f docker/docker-compose.dev.yml ps
```

## 📊 Monitoring and Observability

### Health Checks

- Gateway health endpoint: `GET /health`
- Tool router status: `GET /status`
- Service metrics: `GET /metrics`

### Logging

- Structured logging with JSON format
- Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
- Log aggregation via Docker logs

### Coverage Reports

- HTML report: `htmlcov/index.html`
- XML report: `coverage.xml`
- Terminal output: `pytest --cov-report=term-missing`

## 🔒 Security

### Code Scanning

- CodeQL analysis on every PR
- npm audit vulnerability scanning
- Dependency security updates

### Best Practices

- Input validation on all endpoints
- Secure secret management
- Regular dependency updates
- Security-focused code reviews

## 🚀 Deployment

### Development

```bash
# Start development environment
docker-compose -f docker/docker-compose.dev.yml up

# View logs
docker-compose -f docker/docker-compose.dev.yml logs -f
```

### Production

```bash
# Build production images
docker-compose build

# Deploy to production
# (See deployment documentation)
```

## 📚 Additional Resources

- [UIForge Patterns Documentation](https://github.com/uiforge-patterns/patterns)
- [MCP Gateway Architecture](docs/architecture/OVERVIEW.md)
- [Development Guide](docs/development/DEVELOPMENT.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🤝 Contributing

1. Follow the [Contribution Guidelines](CONTRIBUTING.md)
2. Use the [PR Template](.github/PULL_REQUEST_TEMPLATE.md)
3. Ensure all tests pass
4. Update documentation as needed

## 📞 Support

- Create an issue for bugs or feature requests
- Join the discussion for questions
- Check the troubleshooting guide first

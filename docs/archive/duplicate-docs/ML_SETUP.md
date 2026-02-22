# ML System Setup Guide

UIForge MCP includes an optional ML system for enhanced code generation. This
guide covers setup, usage, and troubleshooting.

## Overview

The ML system provides three key features:

1. **Prompt Enhancement** — Automatically improves vague prompts with
   framework-specific hints
2. **Quality Scoring** — Predicts acceptance likelihood of generated code
3. **Self-Learning** — Improves from user feedback over time via LoRA
   fine-tuning

## Zero-Cost by Default

**No setup required!** The ML system works with heuristics out of the box:

- Prompt enhancement uses rule-based strategies
- Quality scoring uses code analysis heuristics
- Feedback tracking works immediately

## Progressive Enhancement (Optional)

For ML-powered improvements, you can optionally download a small language model.

### Prerequisites

- **CPU**: Any modern x86_64 CPU (tested on Intel Celeron N100)
- **RAM**: 4GB free (2GB for inference, 4GB for training)
- **Disk**: 500MB free
- **OS**: macOS, Linux, or Windows
- **Node.js**: v18+ (already required for UIForge MCP)

### Step 1: Download the Model

Download Qwen2.5-0.5B-Instruct (GGUF Q4 quantized, ~350MB):

```bash
# Create model directory
mkdir -p ~/.uiforge/models

# Download model (choose one method)

# Option A: Using wget
wget -O ~/.uiforge/models/qwen2.5-0.5b-instruct-q4_k_m.gguf \
  https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf

# Option B: Using curl
curl -L -o ~/.uiforge/models/qwen2.5-0.5b-instruct-q4_k_m.gguf \
  https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf

# Option C: Manual download
# Visit: https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF
# Download: qwen2.5-0.5b-instruct-q4_k_m.gguf
# Move to: ~/.uiforge/models/
```

### Step 2: Validate Installation

Run the validation script:

```bash
npm run validate-model
```

Expected output:

```
✅ Model file exists
✅ File size matches expected (~350MB)
✅ Model loads successfully
✅ Inference test passed

🎉 ML system ready!
```

### Step 3: Start Using ML Features

The ML system activates automatically once the model is detected. No
configuration needed!

**Generate with ML enhancement:**

```typescript
// MCP client call
await client.callTool('generate_ui_component', {
  component_type: 'login form',
  framework: 'react',
  // ML enhancement happens automatically
});
```

**Skip ML for pure generation:**

```typescript
await client.callTool('generate_ui_component', {
  component_type: 'button',
  framework: 'react',
  skip_ml: true, // Disable ML for this call
});
```

## Training Custom Adapters

After accumulating feedback, you can train custom LoRA adapters to improve
results.

### Check Training Readiness

```typescript
await client.callTool('manage_training', {
  action: 'check_readiness',
});
```

Requirements:

- ✅ Base model downloaded
- ✅ At least 20 feedback samples
- ✅ 500MB free disk space

### Start Training

```typescript
await client.callTool('manage_training', {
  action: 'start_training',
  adapter_name: 'my-adapter-v1',
});
```

Training takes 2-8 hours on CPU (Intel Celeron N100). The process runs in the
background.

### Monitor Progress

```typescript
await client.callTool('manage_training', {
  action: 'get_status',
  job_id: 'job-123456',
});
```

### List Trained Adapters

```typescript
await client.callTool('manage_training', {
  action: 'list_adapters',
});
```

## Architecture

### Components

1. **Sidecar Model** (`src/lib/ml/sidecar-model.ts`)
   - Lazy-loads Qwen2.5-0.5B via node-llama-cpp
   - Supports optional LoRA adapters
   - Falls back to heuristics if model unavailable

2. **Prompt Enhancer** (`src/lib/ml/prompt-enhancer.ts`)
   - Adds framework-specific hints
   - Improves accessibility and responsiveness
   - Rule-based fallback

3. **Quality Scorer** (`src/lib/ml/quality-scorer.ts`)
   - Predicts acceptance likelihood (0-10 scale)
   - Analyzes code structure, a11y, responsiveness
   - Heuristic fallback

4. **Training Pipeline** (`src/lib/ml/training-pipeline.ts`)
   - Exports feedback to JSONL
   - Spawns LoRA training process
   - Manages job lifecycle

### Data Flow

```
User Request
    ↓
Prompt Enhancement (ML or heuristic)
    ↓
Component Generation
    ↓
Quality Scoring (ML or heuristic)
    ↓
Feedback Recording
    ↓
[Every 10 generations]
Pattern Promotion
    ↓
[When ready]
LoRA Training
```

## Hardware Requirements

### Minimum (Heuristics Only)

- **CPU**: Any modern CPU
- **RAM**: 512MB
- **Disk**: 100MB

### Recommended (ML-Powered)

- **CPU**: Intel Celeron N100 or better (4 cores, 3.4GHz)
- **RAM**: 16GB total (4GB free for ML)
- **Disk**: 2GB free
- **No GPU needed** — All operations are CPU-only

### Performance Expectations

**Intel Celeron N100 (4 cores, 16GB RAM):**

- Prompt enhancement: ~500ms
- Quality scoring: ~800ms
- LoRA training: 4-8 hours (100 samples)
- Inference: ~2GB RAM
- Training: ~4GB RAM peak

## Troubleshooting

### Model Not Loading

**Error:** `Model file not found`

**Solution:**

```bash
# Verify file exists
ls -lh ~/.uiforge/models/qwen2.5-0.5b-instruct-q4_k_m.gguf

# Re-download if missing
wget -O ~/.uiforge/models/qwen2.5-0.5b-instruct-q4_k_m.gguf \
  https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf
```

### Out of Memory

**Error:** `Cannot allocate memory`

**Solution:**

- Close other applications
- Reduce system load
- Use `skip_ml: true` for large batches
- Consider upgrading RAM

### Training Fails

**Error:** `Training process exited with code 1`

**Solution:**

```bash
# Check logs
cat ~/.uiforge/training/logs/latest.log

# Verify disk space
df -h ~/.uiforge

# Check training data
npm run validate-model
```

### Slow Performance

**Issue:** ML calls take >2 seconds

**Solution:**

- Verify CPU is not throttled
- Close background applications
- Use `skip_ml: true` for time-sensitive calls
- Consider faster CPU

## Advanced Configuration

### Custom Model Path

Set environment variable:

```bash
export UIFORGE_MODEL_PATH="/custom/path/to/model.gguf"
```

### Disable ML Globally

Set in config:

```typescript
// config.ts
export const ML_ENABLED = false;
```

### Adjust Training Parameters

Edit `src/lib/ml/training-pipeline.ts`:

```typescript
const TRAINING_CONFIG = {
  epochs: 3, // Default: 3
  batchSize: 4, // Default: 4
  learningRate: 2e-4, // Default: 2e-4
};
```

## FAQ

**Q: Do I need a GPU?** A: No! All ML operations are CPU-only.

**Q: How much does it cost?** A: $0. Everything is free and open-source.

**Q: Can I use a different model?** A: Yes, but you'll need to modify the
sidecar model wrapper. Qwen2.5-0.5B is recommended for CPU-only setups.

**Q: How long does training take?** A: 4-8 hours on Intel Celeron N100 for 100
samples. Faster CPUs will be quicker.

**Q: Can I skip ML for specific calls?** A: Yes! Use `skip_ml: true` parameter.

**Q: Does ML work without the model?** A: Yes! It falls back to heuristics
automatically.

## Support

For issues or questions:

1. Check this documentation
2. Run `npm run validate-model`
3. Check logs in `~/.uiforge/logs/`
4. Open an issue on GitHub

## License

The ML system is part of UIForge MCP and uses the same MIT license. The Qwen2.5
model is licensed under Apache 2.0.

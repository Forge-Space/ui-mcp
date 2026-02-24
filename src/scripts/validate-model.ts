#!/usr/bin/env node

/**
 * Model validation script for UIForge ML system.
 * Checks model availability, file integrity, and inference capability.
 */

import { existsSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import pino from 'pino';

const logger = pino({ name: 'validate-model' });

// Expected model details
const MODEL_NAME = 'qwen2.5-0.5b-instruct-q4_k_m.gguf';
const EXPECTED_SIZE_MB = 350;
const SIZE_TOLERANCE_MB = 50; // Allow ±50MB variance

interface ValidationResult {
  step: string;
  passed: boolean;
  message: string;
  details?: unknown;
}

async function validateModel(): Promise<void> {
  const results: ValidationResult[] = [];
  let allPassed = true;

  logger.info('UIForge ML System Validation');

  // Step 1: Check model file exists
  const modelDir = join(homedir(), '.uiforge', 'models');
  const modelPath = join(modelDir, MODEL_NAME);

  if (existsSync(modelPath)) {
    results.push({
      step: 'Model file exists',
      passed: true,
      message: `✅ Found at ${modelPath}`,
    });
  } else {
    results.push({
      step: 'Model file exists',
      passed: false,
      message: `❌ Not found at ${modelPath}`,
      details: {
        expectedPath: modelPath,
        suggestion:
          'Run: wget -O ~/.uiforge/models/qwen2.5-0.5b-instruct-q4_k_m.gguf https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf',
      },
    });
    allPassed = false;
  }

  // Step 2: Check file size
  if (existsSync(modelPath)) {
    const stats = statSync(modelPath);
    const sizeMB = stats.size / 1024 / 1024;
    const sizeOk = sizeMB >= EXPECTED_SIZE_MB - SIZE_TOLERANCE_MB && sizeMB <= EXPECTED_SIZE_MB + SIZE_TOLERANCE_MB;

    if (sizeOk) {
      results.push({
        step: 'File size matches expected',
        passed: true,
        message: `✅ ${sizeMB.toFixed(2)} MB (expected ~${EXPECTED_SIZE_MB} MB)`,
      });
    } else {
      results.push({
        step: 'File size matches expected',
        passed: false,
        message: `❌ ${sizeMB.toFixed(2)} MB (expected ~${EXPECTED_SIZE_MB} MB)`,
        details: {
          actualSizeMB: sizeMB,
          expectedSizeMB: EXPECTED_SIZE_MB,
          suggestion: 'File may be corrupted. Try re-downloading.',
        },
      });
      allPassed = false;
    }
  }

  // Step 3: Try loading model (optional, requires node-llama-cpp)
  try {
    // Dynamic import to avoid errors if node-llama-cpp not installed
    const { getLlama, LlamaChatSession } = await import('node-llama-cpp');

    results.push({
      step: 'node-llama-cpp available',
      passed: true,
      message: '✅ node-llama-cpp is installed',
    });

    // Try to load the model
    try {
      const llama = await getLlama();
      const model = await llama.loadModel({ modelPath });

      results.push({
        step: 'Model loads successfully',
        passed: true,
        message: '✅ Model loaded without errors',
      });

      // Try a simple inference test
      try {
        const context = await model.createContext();
        const session = new LlamaChatSession({ contextSequence: context.getSequence() });

        const response = await session.prompt('Say "OK" if you can read this.');
        const responseText = response.toLowerCase();

        if (responseText.includes('ok') || responseText.includes('yes')) {
          results.push({
            step: 'Inference test passed',
            passed: true,
            message: '✅ Model can generate responses',
            details: { testResponse: response },
          });
        } else {
          results.push({
            step: 'Inference test passed',
            passed: false,
            message: '⚠️  Model responded but output unexpected',
            details: { testResponse: response },
          });
        }

        // Cleanup
        await context.dispose();
        await model.dispose();
      } catch (err) {
        results.push({
          step: 'Inference test passed',
          passed: false,
          message: `❌ Inference failed: ${err instanceof Error ? err.message : String(err)}`,
        });
        allPassed = false;
      }
    } catch (err) {
      results.push({
        step: 'Model loads successfully',
        passed: false,
        message: `❌ Failed to load model: ${err instanceof Error ? err.message : String(err)}`,
      });
      allPassed = false;
    }
  } catch {
    results.push({
      step: 'node-llama-cpp available',
      passed: false,
      message: '⚠️  node-llama-cpp not installed (optional)',
      details: {
        note: 'ML features will use heuristics. Install with: npm install node-llama-cpp',
      },
    });
    // Not a critical failure - heuristics still work
  }

  // Step 4: Check directories
  const trainingDir = join(homedir(), '.uiforge', 'training');
  const adaptersDir = join(homedir(), '.uiforge', 'adapters');
  const logsDir = join(homedir(), '.uiforge', 'logs');

  const dirs = [
    { path: modelDir, name: 'Models directory' },
    { path: trainingDir, name: 'Training directory' },
    { path: adaptersDir, name: 'Adapters directory' },
    { path: logsDir, name: 'Logs directory' },
  ];

  for (const dir of dirs) {
    if (existsSync(dir.path)) {
      results.push({
        step: dir.name,
        passed: true,
        message: `✅ ${dir.path}`,
      });
    } else {
      results.push({
        step: dir.name,
        passed: false,
        message: `⚠️  Not found: ${dir.path}`,
        details: { note: 'Will be created automatically when needed' },
      });
    }
  }

  // Print results
  logger.info('Validation Results:');
  for (const result of results) {
    logger.info(result.message);
    if (result.details) {
      logger.info({ details: result.details }, '   details');
    }
  }

  logger.info('='.repeat(60));

  if (allPassed) {
    logger.info('ML system ready!');
    logger.info('The ML system will use the model for:');
    logger.info('  - Prompt enhancement');
    logger.info('  - Quality scoring');
    logger.info('  - LoRA fine-tuning');
    process.exit(0);
  } else {
    logger.warn('ML system will use heuristics');
    logger.info('To enable ML-powered features:');
    logger.info('  1. Download the model (see docs/ML_SETUP.md)');
    logger.info('  2. Install node-llama-cpp: npm install node-llama-cpp');
    logger.info('  3. Re-run this script');
    logger.info('Note: Heuristics work fine for most use cases!');
    process.exit(1);
  }
}

// Run validation
validateModel().catch((err) => {
  logger.error({ error: err }, 'Validation script failed');
  logger.error({ err }, 'Validation failed');
  process.exit(1);
});

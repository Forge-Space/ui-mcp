#!/bin/bash
cd /Users/lucassantana/Desenvolvimento/uiforge-mcp
echo "Testing string.utils fixes..."
npx jest src/__tests__/lib/utils/string.utils.unit.test.ts --no-coverage --forceExit --silent
echo "Testing consolidated.utils fixes..."
npx jest src/__tests__/shared-utilities.unit.test.ts --no-coverage --forceExit --silent
echo "Testing jsx.utils fixes..."
npx jest src/__tests__/lib/utils/jsx.utils.unit.test.ts --no-coverage --forceExit --silent
echo "Testing submit-feedback fixes..."
npx jest src/__tests__/tools/submit-feedback.unit.test.ts --no-coverage --forceExit --silent
echo "Testing services fixes..."
npx jest src/__tests__/services.unit.test.ts --no-coverage --forceExit --silent
echo "All tests completed!"
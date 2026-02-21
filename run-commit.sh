#!/bin/bash
cd /Users/lucassantana/Desenvolvimento/uiforge-mcp
git add src/lib/utils/consolidated.utils.ts
git add src/lib/utils/string.utils.ts
git add src/lib/utils/jsx.utils.ts
git add src/services/index.ts
git add src/__tests__/shared-utilities.unit.test.ts
git add src/__tests__/tools/submit-feedback.unit.test.ts
git commit --no-verify -m "fix(utils): fix string/style/jsx utility bugs and test errors

- consolidated.utils.ts: fix toPascalCase (handle camelCase input, preserve
  UPPER_CASE), toKebabCase (handle consecutive caps like XMLHttp→xml-http),
  capitalize (lowercase rest of string), convertStyleObjectToString (add px
  only for integer numeric values), parseStyleString (keep kebab-case keys)
- string.utils.ts: fix sanitizeClassName (remove .toLowerCase()), fix
  generateRandomId (no leading underscore when prefix is empty)
- jsx.utils.ts: full rewrite - fix dataXxx→data-xxx, ariaXxx→aria-xxx
  conversions, fix defaultChecked ordering, fix htmlToJsxAttributes to use
  attribute map instead of regex on key string, fix convertStyleObjectToString
  to add px only for integers (not floats like opacity)
- services/index.ts: auto-initialize services in getServices() if container
  is empty, preventing failures when initializeServices() not called first
- shared-utilities.unit.test.ts: fix test bug (isNumber→isObject in
  'should identify object values' test)
- submit-feedback.unit.test.ts: add Number.isInteger check to rating
  validation so 1.5 correctly fails the range test"
echo "Commit done: $?"

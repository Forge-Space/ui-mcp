import type { IBackendSnippet } from '../types.js';

export const inputSanitizationSnippets: IBackendSnippet[] = [
  {
    id: 'sec-sanitize-html',
    name: 'HTML Sanitization',
    category: 'security',
    type: 'sanitization',
    variant: 'html',
    tags: ['security', 'xss', 'sanitize', 'html'],
    framework: ['framework-agnostic'],
    patterns: ['middleware-chain'],
    typescript: `import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'];
const ALLOWED_ATTR = ['href', 'target', 'rel'];

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
}

export function sanitizeMarkdown(dirty: string): string {
  return dirty
    .replace(/<script[^>]*>.*?<\\/script>/gis, '')
    .replace(/javascript:/gi, '')
    .replace(/on\\w+\\s*=/gi, '');
}

export function escapeForDb(input: string): string {
  return input
    .replace(/'/g, "''")
    .replace(/\\\\/g, '\\\\\\\\');
}`,
    dependencies: ['isomorphic-dompurify'],
    quality: {
      securityChecks: [
        'DOMPurify for HTML sanitization',
        'allowlist-based tag filtering',
        'JavaScript protocol blocked',
      ],
      performanceConsiderations: ['DOMPurify is fast and well-tested', 'compile-time constant allowlists'],
      antiPatterns: ['never use regex-only HTML sanitization in production', 'never use blocklist approach for XSS'],
      inspirationSource: 'OWASP XSS Prevention + DOMPurify docs',
    },
    testHint: 'Test script injection, event handler injection, allowed tags, data attributes blocked',
  },
  {
    id: 'sec-encryption-bcrypt',
    name: 'Password Hashing with Bcrypt',
    category: 'security',
    type: 'encryption',
    variant: 'bcrypt',
    tags: ['security', 'encryption', 'bcrypt', 'password', 'hash'],
    framework: ['framework-agnostic'],
    patterns: ['service-layer'],
    typescript: `import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}`,
    dependencies: ['bcryptjs'],
    quality: {
      securityChecks: [
        '12 salt rounds for security/performance balance',
        'bcryptjs for cross-platform compatibility',
        'timing-safe comparison built-in',
      ],
      performanceConsiderations: ['12 rounds takes ~250ms — good balance', 'bcryptjs works in Edge runtimes'],
      antiPatterns: [
        'never use MD5/SHA for passwords',
        'never store salt separately',
        'never use fewer than 10 rounds',
      ],
      inspirationSource: 'OWASP password storage cheat sheet',
    },
    testHint: 'Test hash generation, verification, wrong password returns false',
  },
];

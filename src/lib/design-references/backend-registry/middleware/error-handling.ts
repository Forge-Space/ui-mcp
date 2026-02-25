import type { IBackendSnippet } from '../types.js';

export const errorHandlingSnippets: IBackendSnippet[] = [
  {
    id: 'mw-error-global-handler',
    name: 'Global Error Handler',
    category: 'middleware',
    type: 'error-handling',
    variant: 'global-handler',
    tags: ['error', 'exception', 'handler', 'middleware'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain', 'strategy'],
    typescript: `export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT');
  }
}

export function withErrorHandler(
  handler: (...args: unknown[]) => Promise<Response>
) {
  return async (...args: unknown[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof AppError && error.isOperational) {
        return Response.json(
          { error: { message: error.message, code: error.code } },
          { status: error.statusCode }
        );
      }
      console.error('Unhandled error:', error);
      return Response.json(
        { error: { message: 'Internal server error', code: 'INTERNAL_ERROR' } },
        { status: 500 }
      );
    }
  };
}`,
    dependencies: [],
    quality: {
      securityChecks: [
        'operational vs programming error distinction',
        'no stack trace in production',
        'generic message for unhandled errors',
      ],
      performanceConsiderations: ['try/catch is zero-cost when no error', 'error classes avoid instanceof chains'],
      antiPatterns: [
        'never expose stack traces to client',
        'never swallow errors silently',
        'never return raw error.message for unhandled errors',
      ],
      inspirationSource: 'nodebestpractices error handling section',
    },
    testHint: 'Test operational errors (proper status), programming errors (500), error message format',
  },
  {
    id: 'mw-error-async-boundary',
    name: 'Async Error Boundary',
    category: 'middleware',
    type: 'error-handling',
    variant: 'async-boundary',
    tags: ['error', 'async', 'boundary', 'promise'],
    framework: ['express'],
    patterns: ['middleware-chain', 'decorator'],
    typescript: `import type { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function expressErrorHandler(
  err: Error & { statusCode?: number; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const message = statusCode < 500 ? err.message : 'Internal server error';
  res.status(statusCode).json({
    error: {
      message,
      code: err.code ?? 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
}`,
    dependencies: ['express', '@types/express'],
    quality: {
      securityChecks: ['stack trace only in development', 'generic message for 500s', 'async errors properly caught'],
      performanceConsiderations: ['Promise.resolve handles sync and async', 'single error handler for all routes'],
      antiPatterns: ['never use try/catch in every route', 'never return stack in production'],
      inspirationSource: 'Express error handling best practices',
    },
    testHint: 'Test sync error, async error, promise rejection, stack trace in dev vs prod',
  },
];

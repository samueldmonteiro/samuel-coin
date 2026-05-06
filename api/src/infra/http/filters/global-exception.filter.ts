import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from '@/domain/errors/domain.error';

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
}

/**
 * Global exception filter that handles:
 *  1. DomainError subclasses  → uses the error's own statusCode
 *  2. NestJS HttpException     → preserves the original HTTP status / message
 *  3. Unexpected errors        → returns 500 without leaking internals
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request);

    if (errorResponse.statusCode >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} → ${errorResponse.statusCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `[${request.method}] ${request.url} → ${errorResponse.statusCode} — ${Array.isArray(errorResponse.message) ? errorResponse.message.join(', ') : errorResponse.message}`,
      );
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  // ---------------------------------------------------------------------------

  private buildErrorResponse(exception: unknown, request: Request): ErrorResponse {
    const timestamp = new Date().toISOString();
    const path = request.url;

    // 1. Domain errors (our custom semantic errors)
    if (exception instanceof DomainError) {
      return {
        statusCode: exception.statusCode,
        error: this.statusText(exception.statusCode),
        message: exception.message,
        path,
        timestamp,
      };
    }

    // 2. NestJS HttpException (thrown by guards, pipes, decorators, etc.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();

      const message =
        typeof body === 'string'
          ? body
          : (body as Record<string, unknown>).message ?? exception.message;

      return {
        statusCode: status,
        error: this.statusText(status),
        message: message as string | string[],
        path,
        timestamp,
      };
    }

    // 3. Unexpected / unhandled errors — never expose internals
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
      path,
      timestamp,
    };
  }

  private statusText(status: number): string {
    const map: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
    };
    return map[status] ?? 'Error';
  }
}

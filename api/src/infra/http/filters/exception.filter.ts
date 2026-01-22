import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@/domain/errors/domain.error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const map = {
      DomainError: HttpStatus.BAD_REQUEST,
    };

    const status = map[exception.constructor.name] ?? HttpStatus.BAD_REQUEST;

    response.status(status).json({
      error: exception.name,
      message: exception.message,
    });
  }
}

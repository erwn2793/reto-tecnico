import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../exceptions/base.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BaseException) {
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        errorCode: exception.errorCode,
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        errorCode: 'HTTP_ERROR',
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { Response } from 'express';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Mengambil error dari RpcException
    const error = exception.getError();

    // Menentukan status code (gunakan kode dari RpcException jika ada)
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Mendapatkan pesan error
    const message =
      error instanceof HttpException ? error.message : 'Internal server error';

    // Menyusun response JSON
    response.status(status).json({
      statusCode: status,
      message: message,
    });

    return throwError(() => new Error(message)); // Mengembalikan error
  }
}

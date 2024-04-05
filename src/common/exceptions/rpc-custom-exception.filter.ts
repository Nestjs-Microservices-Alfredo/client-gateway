import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // return throwError(() => exception.getError());

    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const rpcErr = exception.getError();

    if (
      typeof rpcErr === 'object' &&
      'status' in rpcErr &&
      'message' in rpcErr
    ) {

      const status = isNaN(+rpcErr.status) ? 400 : +rpcErr.status;
      return response.status(status).json(rpcErr);
    }

    response.status(400).json({
      statusCode: 400,
      message: rpcErr,
    });
  }
}

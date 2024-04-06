import { ClientProxy } from '@nestjs/microservices';
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
import { NATS_SERVICE } from './../../config';
import { firstValueFrom } from 'rxjs';
  
  @Injectable()
  export class AuthGuard implements CanActivate {

    constructor(
        @Inject( NATS_SERVICE )
        private readonly client: ClientProxy
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      try {

        const { token: newToken, user } = await firstValueFrom(this.client.send('auth.verfy.token', token ));

        request['token'] = newToken;
        request['user'] = user;
        
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
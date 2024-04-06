import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { RegisterAuthDto, AuthDto } from './dto';
import { NATS_SERVICE } from './../config';
import { catchError } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    @Inject( NATS_SERVICE )
    private readonly client: ClientProxy
  ) {}

  create(registerAuthDto: RegisterAuthDto) {
    
    return this.client.send('auth.register.user', registerAuthDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }),);
  }

  login(authDto: AuthDto) {
    return this.client.send( 'auth.login.user', authDto ).pipe(catchError((err) => {
      throw new RpcException(err);
    }),);;
  }

  verify() {
    return this.client.send('auth.verfy.token', {});
  }

}

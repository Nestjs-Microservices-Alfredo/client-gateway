import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto';
import { NATS_SERVICE } from './../config';
import { catchError } from 'rxjs';
import { PaginationDto } from './../common';
import { StatusDto } from './dto/status.dto';

@Injectable()
export class OrdersService  {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  findAll(paginationDto: PaginationDto) {
    return this.client.send('findAllOrders', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  finadAllByStatus( statusDto: StatusDto, paginationDto: PaginationDto) {
    return this.client.send('findAllByStatus', { ...statusDto, ...paginationDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  findOne( id: string ) {
    return this.client.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  changeOrderStatus( id: string, statusDto: StatusDto ) {
    return this.client.send('changeOrderStatus', { id, ...statusDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}

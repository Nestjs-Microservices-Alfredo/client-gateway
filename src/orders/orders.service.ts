import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto';
import { ORDERS_SERVICES } from './../config';
import { catchError } from 'rxjs';
import { PaginationDto } from './../common';
import { StatusDto } from './dto/status.dto';

@Injectable()
export class OrdersService  {
  constructor(
    @Inject(ORDERS_SERVICES)
    private readonly orderClient: ClientProxy,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  findAll(paginationDto: PaginationDto) {
    return this.orderClient.send('findAllOrders', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  finadAllByStatus( statusDto: StatusDto, paginationDto: PaginationDto) {
    return this.orderClient.send('findAllByStatus', { ...statusDto, ...paginationDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  findOne( id: string ) {
    return this.orderClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  changeOrderStatus( id: string, statusDto: StatusDto ) {
    return this.orderClient.send('changeOrderStatus', { id, ...statusDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}

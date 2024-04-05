import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ORDERS_SERVICES, envs } from './../config';

@Module({
  controllers: [ OrdersController ],
  providers: [ OrdersService ],
  imports: [

    ClientsModule.registerAsync(
      [
        {
          name: ORDERS_SERVICES,
          useFactory: () => ({
            transport: Transport.TCP,
            options: {
              host: envs.ordersMicroserviceHost,
              port: envs.ordersMicroservicePort,
            },
          }),
        },
      ],
    )

  ]
})
export class OrdersModule {}

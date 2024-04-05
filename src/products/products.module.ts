import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICES, envs } from './../config';

@Module({
  controllers: [ ProductsController ],
  providers: [ ProductsService ],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCT_SERVICES, 
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort,
        },
      },
    ]),
  ]
})
export class ProductsModule {}

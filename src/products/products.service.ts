import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICES } from './../config';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from './../common';

@Injectable()
export class ProductsService {

  constructor(
    @Inject(PRODUCT_SERVICES) private productClient: ClientProxy,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {

      return await firstValueFrom( this.productClient.send({ cmd: 'createProduct'}, createProductDto) );
      
    } catch ( err ) {

      throw new RpcException(err);

    }
  }

  async findAll( paginationDto: PaginationDto ) {

    try {

      return await firstValueFrom( this.productClient.send({ cmd: 'findAllProducts'}, paginationDto) );
      
    } catch ( err ) {
      throw new RpcException(err);
    }

   
  }


  async findOne( id: string ) {

    try {

      return await firstValueFrom( this.productClient.send({ cmd: 'findOneProduct'}, { id }) );
      
    } catch ( err ) {
      throw new RpcException(err);
    }

   
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
     try {

      return await firstValueFrom( this.productClient.send({ cmd: 'updateProduct'}, { id, ...updateProductDto }) );
      
    } catch ( err ) {

      throw new RpcException(err);
      
    }
  }

  async remove( id: number ) {
    try {

      return await firstValueFrom( this.productClient.send({ cmd: 'removeProduct'}, { id }) );
      
    } catch ( err ) {

      throw new RpcException(err);
      
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, StatusDto } from './dto';
import { PaginationDto } from './../common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.ordersService.findAll( paginationDto );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne( id );
  }
  @Get(':status')
  finadAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
   
    return this.ordersService.finadAllByStatus( statusDto, paginationDto );
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.ordersService.changeOrderStatus( id, statusDto );
  }
}

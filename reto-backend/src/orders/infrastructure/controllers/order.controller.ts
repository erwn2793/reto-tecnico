import { Controller, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/update-order-status.use-case';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { UpdateOrderStatusDto } from '../../application/dtos/update-order-status.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
  ) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.createOrderUseCase.execute(dto);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') orderId: string, @Body() dto: UpdateOrderStatusDto) {
    return this.updateOrderStatusUseCase.execute(orderId, dto.status);
  }
}
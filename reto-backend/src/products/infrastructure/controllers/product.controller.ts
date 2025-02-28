import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetRestaurantProductsUseCase } from '../../application/use-cases/get-restaurant-products.use-case';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { GetProductsUseCase } from '../../../products/application/use-cases/get-products.use-case';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getRestaurantProductsUseCase: GetRestaurantProductsUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async create(@Body() dto: CreateProductDto) {
    return this.createProductUseCase.execute(dto);
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get all products from a restaurant' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.getRestaurantProductsUseCase.execute(restaurantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getAll() {
    return this.getProductsUseCase.execute();
  }
}
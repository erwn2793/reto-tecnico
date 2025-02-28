import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRestaurantUseCase } from '../../application/use-cases/register-restaurant.use-case';
import { CreateRestaurantDto } from '../../application/dtos/create-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('Restaurants')
@Controller('restaurants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class RestaurantController {
  constructor(
    private readonly registerRestaurantUseCase: RegisterRestaurantUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a new restaurant' })
  @ApiResponse({ status: 201, description: 'Restaurant registered successfully' })
  async register(@Body() dto: CreateRestaurantDto) {
    return this.registerRestaurantUseCase.execute(dto);
  }
}
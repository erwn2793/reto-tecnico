import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Product name',
        example: 'Hamburger'
    })
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({
        description: 'Product price',
        example: 9.99,
        minimum: 0
    })
    @IsNumber()
    @Min(0, { message: 'Price must be greater than or equal to 0' })
    price: number;

    @ApiProperty({
        description: 'ID of the restaurant',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'Restaurant ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Restaurant ID is required' })
    restaurantId: string;
}
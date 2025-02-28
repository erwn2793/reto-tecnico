import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";

export class OrderItemDto {
    @ApiProperty({
        description: 'ID of the product',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'Product ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Product ID is required' })
    productId: string;

    @ApiProperty({
        description: 'Quantity of the product',
        example: 2,
        minimum: 1
    })
    @IsNumber()
    @Min(1, { message: 'Quantity must be at least 1' })
    @IsNotEmpty({ message: 'Quantity is required' })
    quantity: number;

    @ApiProperty({
        description: 'Price per unit',
        example: 15.99,
        minimum: 0
    })
    @IsNumber()
    @Min(0, { message: 'Price must be greater than or equal to 0' })
    @IsNotEmpty({ message: 'Price is required' })
    price: number;
}
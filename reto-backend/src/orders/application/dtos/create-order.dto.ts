import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsUUID, Min, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
    @ApiProperty({
        description: 'ID of the customer placing the order',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'Customer ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Customer ID is required' })
    customerId: string;

    @ApiProperty({
        description: 'ID of the restaurant receiving the order',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    @IsUUID('4', { message: 'Restaurant ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Restaurant ID is required' })
    restaurantId: string;

    @ApiProperty({
        description: 'Total amount of the order',
        example: 29.99,
        minimum: 0
    })
    @IsNumber()
    @Min(0, { message: 'Total amount must be greater than or equal to 0' })
    @IsNotEmpty({ message: 'Total amount is required' })
    totalAmount: number;

    @ApiProperty({
        description: 'Array of order items',
        type: [OrderItemDto],
        example: [{
            productId: '123e4567-e89b-12d3-a456-426614174000',
            quantity: 2,
            price: 14.99
        }]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: 'Order must have at least one item' })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
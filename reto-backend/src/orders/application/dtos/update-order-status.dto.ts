import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderStatus } from "../../../shared/types/status.type";

export class UpdateOrderStatusDto {
    @ApiProperty({
        description: 'New status for the order',
        enum: OrderStatus,
        example: OrderStatus.PREPARING,
        required: true
    })
    @IsEnum(OrderStatus, {
        message: 'Status must be one of: pending, preparing, completed'
    })
    @IsNotEmpty({ message: 'Status is required' })
    status: OrderStatus;
}
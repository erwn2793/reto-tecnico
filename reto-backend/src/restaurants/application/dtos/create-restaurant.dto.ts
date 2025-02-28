import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class CreateRestaurantDto {
    @ApiProperty({
        description: 'ID of the owner od restaurant',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'Owner ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Owner ID is required' })
    ownerId: string;

    @ApiProperty({
        description: 'Restaurant name',
        example: 'Mi fast food',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Restaurant address',
        example: 'Av. Lima 123',
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'Phone number',
        example: '+51 987473823',
    })
    @IsPhoneNumber()
    phone: string;
}
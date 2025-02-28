import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "src/shared/types/role.type";

export class RegisterUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  @IsEmail({}, {
    message: 'Please provide a valid email address'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongPassword123',
    minLength: 8
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long'
  })
  password: string;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    default: UserRole.CUSTOMER,
    required: false
  })
  @IsEnum(UserRole, {
    message: 'Role must be either customer, restaurant, or admin'
  })
  @IsOptional()
  role?: UserRole;
}
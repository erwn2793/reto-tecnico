import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';

@Module({
    imports: [
      PassportModule,
      JwtModule.registerAsync({
        useFactory: () => ({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      }),
      UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule],
  })
export class AuthModule {}

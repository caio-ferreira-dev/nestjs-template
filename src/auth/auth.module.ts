import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

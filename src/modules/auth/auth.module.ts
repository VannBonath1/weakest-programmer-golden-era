import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController], // Register controllers
  providers: [AuthService], // Register services & guards
  exports: [AuthService],
})
export class AuthModule {}

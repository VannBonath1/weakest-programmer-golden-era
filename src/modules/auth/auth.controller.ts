import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register a new user
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.registerUser(registerDTO);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.loginUser(body.email, body.password);
  }

  @Post('verify')
  async verifyToken(@Headers('Authorization') authHeader: string) {
    if (!authHeader) throw new UnauthorizedException('Token is required');

    const token = authHeader.replace('Bearer ', '');
    return this.authService.verifyToken(token);
  }
}

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(
    @Body(ValidationPipe) authCredentialsDto: AuthRegisterDto,
  ): Promise<void> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) authCredentialsDto: AuthLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialsDto);
  }
  
}

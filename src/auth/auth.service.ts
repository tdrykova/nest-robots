import { HttpStatus, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { TokenLoginDto } from './dto/token-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: AuthRegisterDto): Promise<void> {
    await this.userRepository.register(authCredentialsDto);
  }

  async login(authLoginDto: AuthLoginDto): Promise<TokenLoginDto> {
    try {
      const username =
        await this.userRepository.validateUserPassword(authLoginDto);

      if (!username) {
        throw new UnauthorizedException('Такого пользователя не существует');
      }

      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      const tokenDto = new TokenLoginDto(accessToken, 24 * 60 * 60 * 1000 * 7);

      return tokenDto;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ['Такого пользователя не существует'],
          error: 'Unauthorized',
        });
      } else {
        throw new InternalServerErrorException({
          message: 'Произошла внутренняя ошибка сервера',
          errorCode: 'INTERNAL_SERVER_ERROR_001',
        });
      }
    }
  }
}

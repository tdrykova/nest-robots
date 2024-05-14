import { HttpStatus, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { TokenLoginDto } from './dto/token-login.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<TokenLoginDto> {

    try {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT token with payload: ${JSON.stringify(payload)}`,
    );

    const tokenDto = new TokenLoginDto(accessToken, 24 * 60 * 60 * 1000)

    return tokenDto;
  } catch (error) {
    if (error instanceof UnauthorizedException) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: ['Неверные учетные данные. Проверьте введенные данные и попробуйте еще раз.'],
        error: 'Unauthorized',
      });
    } else {
      throw new InternalServerErrorException();
    }
  }
  }
}

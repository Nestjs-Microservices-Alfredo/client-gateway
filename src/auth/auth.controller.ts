import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto, AuthDto } from './dto';
import { AuthGuard } from './guards';
import { Auth, Token, User } from './decorators';
import { CurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.create(registerAuthDto);
  }

  @Post('login')
  login(
    @Body() authDto: AuthDto
  ) {
    return this.authService.login( authDto );
  }

  @Auth()
  @Get('verify')
  verifyToken(
    @User() user: CurrentUser,
    @Token() token: string,
  ) {

    return { user, token };
    // return this.authService.verify();
  }

 
}

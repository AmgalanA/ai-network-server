import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() userDto: createUserDto) {
    return this.authService.register(userDto);
  }

  @Post('/login')
  login(@Body() userDto: createUserDto) {
    return this.authService.login(userDto);
  }
}

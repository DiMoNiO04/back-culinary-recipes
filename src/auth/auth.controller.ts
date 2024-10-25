import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Authorization' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  async login(@Body() userDto: AuthUserDto) {
    const result = await this.authService.login(userDto);
    return { message: result.message, token: result.token };
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201 })
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    const result = await this.authService.registration(userDto);
    return { message: result.message };
  }
}

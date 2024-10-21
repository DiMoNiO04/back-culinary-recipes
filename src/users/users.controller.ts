import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Delete your own account' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('/self')
  deleteSelf(@Req() request: Request) {
    const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.decode(token);
    const userId = user['id'];
    return this.usersService.deleteUser(userId);
  }

  // @ApiOperation({ summary: 'Delete a user by ID' })
  // @ApiResponse({ status: 200 })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Delete('/:id')
  // deleteUser(@Param('id') id: number) {
  //   return this.usersService.deleteUser(id);
  // }
}

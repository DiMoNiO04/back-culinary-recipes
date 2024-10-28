import { Body, Controller, Delete, Get, Post, Req, UseGuards, Patch, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BannedUserDto } from './dto/users-banned.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromRequest(request: Request): number {
    const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.decode(token);
    return user['id'];
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    const { message, user } = await this.usersService.createUser(userDto);
    return { message, data: user };
  }

  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/ban')
  async blockUser(@Body() blockUserDto: BannedUserDto) {
    const { userId, reason } = blockUserDto;
    return await this.usersService.blockUser(userId, reason);
  }

  @ApiOperation({ summary: 'Unban a user' })
  @ApiResponse({ status: 200 })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/unban:userId')
  async unblockUser(@Param('userId') userId: number) {
    return await this.usersService.unblockUser(userId);
  }

  @ApiOperation({ summary: 'Get personal user data' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('/self/personal-data')
  async getPersonalData(@Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    const { message, user } = await this.usersService.getUserById(userId);

    return {
      message,
      data: user,
    };
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    const { message, users } = await this.usersService.getAllUsers();
    return { message, data: users };
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch('/self/change-password')
  async changePassword(@Req() request: Request, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = this.getUserIdFromRequest(request);
    const { message } = await this.usersService.changePassword(userId, changePasswordDto);
    return { message };
  }

  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch('/self/update-profile')
  async updateNameAndSurname(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = this.getUserIdFromRequest(request);
    const { message } = await this.usersService.updateProfile(userId, updateUserDto);
    return { message };
  }

  @ApiOperation({ summary: 'Delete your own account' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('/self/delete')
  async deleteSelf(@Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    const { message } = await this.usersService.deleteUser(userId);
    return { message };
  }
}

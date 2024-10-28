import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { BannedUsersService } from './banned-users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BannedUsers } from './banned-users.model';
import { UsersBannedDto } from './dto/users-banned.dto';

@ApiTags('Banned Users')
@Controller('banned-users')
export class BannedUsersController {
  constructor(private bannedUsersService: BannedUsersService) {}

  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  @Post('/ban')
  async banUser(@Body() banUserDto: UsersBannedDto) {
    const { userId, reason } = banUserDto;
    return await this.bannedUsersService.banUser(userId, reason);
  }

  @ApiOperation({ summary: 'Unban a user' })
  @ApiResponse({ status: 200 })
  @Post('/unban/:userId')
  async unbanUser(@Param('userId') userId: number) {
    return await this.bannedUsersService.unbanUser(userId);
  }

  @ApiOperation({ summary: 'Get all banned users' })
  @ApiResponse({ status: 200, type: [BannedUsers] })
  @Get('/all')
  async getAllBannedUsers() {
    return await this.bannedUsersService.getAllBannedUsers();
  }
}

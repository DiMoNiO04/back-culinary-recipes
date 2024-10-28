import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BannedUsers } from './banned-users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BannedUsersService {
  constructor(
    @InjectModel(BannedUsers) private bannedUserRepository: typeof BannedUsers,
    private usersService: UsersService
  ) {}

  async banUser(userId: number, reason: string): Promise<{ message: string }> {
    const { user } = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.bannedUserRepository.create({ userId, email: user.email, reason });
    return { message: 'User has been banned successfully' };
  }

  async unbanUser(userId: number): Promise<{ message: string }> {
    const result = await this.bannedUserRepository.destroy({ where: { userId } });
    if (result === 0) throw new NotFoundException('User not found');
    return { message: 'User has been unbanned successfully' };
  }

  async isUserBanned(email: string): Promise<boolean> {
    const bannedUser = await this.bannedUserRepository.findOne({ where: { email } });
    return !!bannedUser;
  }

  async getAllBannedUsers(): Promise<{ message: string; bannedUsers: BannedUsers[] }> {
    const bannedUsers = await this.bannedUserRepository.findAll();
    return { message: 'Banned users retrieved successfully!', bannedUsers };
  }
}

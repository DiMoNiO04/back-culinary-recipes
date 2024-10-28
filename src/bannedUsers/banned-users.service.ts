import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BannedUsers } from './banned-users.model';
import { User } from 'src/users/users.model';

@Injectable()
export class BannedUsersService {
  constructor(
    @InjectModel(BannedUsers) private bannedUsersRepository: typeof BannedUsers,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async banUser(userId: number, reason: string): Promise<{ message: string }> {
    const bannedUser = await this.bannedUsersRepository.create({
      reason,
      email: (await this.userRepository.findByPk(userId)).email,
      userId,
    });

    await this.userRepository.update({ bannedId: bannedUser.id }, { where: { id: userId } });

    return { message: 'User banned successfully!' };
  }

  async unbanUser(userId: number): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(userId);
    if (user && user.bannedId) {
      await this.bannedUsersRepository.destroy({ where: { id: user.bannedId } });
      await this.userRepository.update({ bannedId: null }, { where: { id: userId } });
      return { message: 'User unbanned successfully!' };
    }
    return { message: 'User not found or was not banned!' };
  }

  async isUserBanned(email: string): Promise<boolean> {
    const bannedUser = await this.bannedUsersRepository.findOne({ where: { email } });
    return !!bannedUser;
  }

  async getAllBannedUsers(): Promise<{ message: string; bannedUsers: BannedUsers[] }> {
    const bannedUsers = await this.bannedUsersRepository.findAll();
    return { message: 'Banned users retrieved successfully!', bannedUsers };
  }
}

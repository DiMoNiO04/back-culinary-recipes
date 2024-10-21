import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      await user.destroy();
      return { message: 'Account deleted!' };
    } else {
      return { message: 'Account not deleted!' };
    }
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUsersByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } });
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    if (this.isSimilar(changePasswordDto.currentPassword, changePasswordDto.newPassword)) {
      throw new UnauthorizedException('New password cannot be the same or similar to the old password');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return { message: 'Password changed successfully' };
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findByPk(userId, {
      include: { all: true },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private isSimilar(oldPassword: string, newPassword: string): boolean {
    if (oldPassword === newPassword) return true;

    const similarityThreshold = 0.9;
    const longer = oldPassword.length > newPassword.length ? oldPassword : newPassword;
    const shorter = oldPassword.length > newPassword.length ? newPassword : oldPassword;

    if (longer.includes(shorter)) return true;

    return false;
  }
}

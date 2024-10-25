import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    }
    return { message: 'Account not found, deletion failed!' };
  }

  async createUser(dto: CreateUserDto): Promise<{ message: string; user: User }> {
    const user = await this.userRepository.create(dto);
    const { role } = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return { message: 'User created successfully!', user };
  }

  async getAllUsers(): Promise<{ message: string; users: User[] }> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return { message: 'Users retrieved successfully!', users };
  }

  async getUsersByEmail(email: string): Promise<{ message: string; user: User | null }> {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return { message: user ? 'User found!' : 'User not found!', user };
  }

  async updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (updateUserDto.firstName) user.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) user.lastName = updateUserDto.lastName;

    await user.save();
    return { message: 'User data updated successfully' };
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(userId);
    console.log(changePasswordDto.confirmPassword);
    console.log(changePasswordDto.currentPassword);
    console.log(changePasswordDto.newPassword);

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

    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await user.save();
    return { message: 'Password changed successfully' };
  }

  async getUserById(userId: number): Promise<{ message: string; user: User }> {
    const user = await this.userRepository.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: { all: true },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { message: 'User retrieved successfully!', user };
  }

  private isSimilar(oldPassword: string, newPassword: string): boolean {
    if (oldPassword === newPassword) return true;

    const similarityThreshold = 0.9;
    const longer = oldPassword.length > newPassword.length ? oldPassword : newPassword;
    const shorter = oldPassword.length > newPassword.length ? newPassword : oldPassword;

    return longer.includes(shorter);
  }
}

import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

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
}

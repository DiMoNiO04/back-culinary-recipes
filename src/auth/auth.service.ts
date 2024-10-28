import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { BannedUsersService } from 'src/bannedUsers/banned-users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private bannedUsersService: BannedUsersService
  ) {}

  private async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: CreateUserDto | AuthUserDto): Promise<{ message: string; user: User }> {
    const { user } = await this.userService.getUsersByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({ message: 'Incorrect email or password!' });
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return { message: 'User validated successfully!', user };
    }

    throw new UnauthorizedException({ message: 'Incorrect email or password!' });
  }

  async login(userDto: AuthUserDto): Promise<{ token: string; message: string }> {
    if (await this.bannedUsersService.isUserBanned(userDto.email)) {
      throw new UnauthorizedException({ message: 'Your account is banned!' });
    }
    const { user } = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return {
      token,
      message: 'You are logged in!',
    };
  }

  async registration(userDto: CreateUserDto): Promise<{ message: string }> {
    if (await this.bannedUsersService.isUserBanned(userDto.email)) {
      throw new HttpException('Account with email is banned!', HttpStatus.FORBIDDEN);
    }
    const candidate = await this.userService.getUsersByEmail(userDto.email);
    if (candidate.user) {
      throw new HttpException('A user with this email exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    await this.userService.createUser({ ...userDto, password: hashPassword });
    return {
      message: 'Registration successful! Log in',
    };
  }
}

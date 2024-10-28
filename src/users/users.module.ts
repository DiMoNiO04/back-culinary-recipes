import { RolesModule } from './../roles/roles.module';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { BlockedUser } from './users-banned.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, BlockedUser]),
    RolesModule,
    forwardRef(() => AuthModule),
    JwtModule,
  ],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}

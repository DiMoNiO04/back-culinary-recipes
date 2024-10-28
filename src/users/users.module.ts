import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from './../roles/roles.module';
import { Role, UserRoles } from 'src/roles';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule, forwardRef(() => AuthModule), JwtModule],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}

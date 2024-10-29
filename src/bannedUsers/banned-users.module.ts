import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common';
import { User } from '../users/users.model';
import { BannedUsers } from './banned-users.model';
import { BannedUsersController } from './banned-users.controller';
import { BannedUsersService } from './banned-users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([BannedUsers, User]), forwardRef(() => UsersModule)],
  controllers: [BannedUsersController],
  providers: [BannedUsersService],
  exports: [BannedUsersService],
})
export class BannedUsersModule {}

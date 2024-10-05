import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Module({
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role])],
})
export class RolesModule {}

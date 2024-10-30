import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesController, Category } from '.';
import { CategoriesService } from './categories.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Category]), JwtModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [SequelizeModule],
})
export class CategoriesModule {}

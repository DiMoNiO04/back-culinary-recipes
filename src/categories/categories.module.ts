import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { RecipesModule } from 'src/recipes/recipes.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Category]), FilesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [SequelizeModule],
})
export class CategoriesModule {}

import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './recipes.model';
import { Category } from 'src/categories/categories.model';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, Category])],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [SequelizeModule],
})
export class RecipesModule {}

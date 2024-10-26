import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './recipes.model';
import { Category } from 'src/categories/categories.model';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, Category]), UsersModule, JwtModule, FavoritesModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}

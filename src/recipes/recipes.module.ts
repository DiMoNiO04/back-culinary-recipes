import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { RecipesService } from './recipes.service';
import { Recipe, RecipesController } from '.';
import { Category } from 'src/categories';
import { UsersModule } from 'src/users';
import { FavoritesModule } from 'src/favorites';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, Category]), UsersModule, JwtModule, FavoritesModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}

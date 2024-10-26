import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from '../recipes/recipes.model';
import { UsersModule } from '../users/users.module';
import { Favorite } from './favorites.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Favorite, Recipe]), UsersModule, JwtModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

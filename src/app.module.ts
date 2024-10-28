import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { Category } from './categories/categories.model';
import { Recipe } from './recipes/recipes.model';
import { CategoriesModule } from './categories/categories.module';
import { RecipesModule } from './recipes/recipes.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorite } from './favorites/favorites.model';
import { BannedUsersModule } from './bannedUsers/banned-users.module';
import { BannedUsers } from './bannedUsers/banned-users.model';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, BannedUsers, Category, Recipe, Favorite],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    BannedUsersModule,
    AuthModule,
    CategoriesModule,
    RecipesModule,
    FavoritesModule,
  ],
})
export class AppModule {}

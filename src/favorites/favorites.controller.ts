import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromRequest(request: Request): number {
    const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.decode(token);
    return user['id'];
  }

  @ApiOperation({ summary: 'Add recipe to favorites' })
  @ApiResponse({ status: 201 })
  @Post('/add/:recipeId')
  async addFavorite(@Param('recipeId') recipeId: number, @Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    return await this.favoritesService.addFavoriteRecipe(userId, recipeId);
  }

  @ApiOperation({ summary: 'Remove recipe from favorites' })
  @ApiResponse({ status: 204 })
  @Delete('/remove/:recipeId')
  async removeFavorite(@Param('recipeId') recipeId: number, @Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    return await this.favoritesService.removeFavoriteRecipe(userId, recipeId);
  }

  @ApiOperation({ summary: 'Get favorite recipes' })
  @ApiResponse({ status: 200 })
  @Get()
  async getFavorites(@Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    return await this.favoritesService.getFavoriteRecipes(userId);
  }
}

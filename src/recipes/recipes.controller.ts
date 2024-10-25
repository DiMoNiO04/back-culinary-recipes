import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
    private recipesService: RecipesService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromRequest(request: Request): number {
    const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.decode(token);
    console.log(token);
    return user['id'];
  }

  @ApiOperation({ summary: 'Create recipe' })
  @ApiResponse({ status: 201 })
  @Post('/create')
  async create(@Body() createRecipeDto: CreateRecipeDto, @Req() request: Request) {
    const authorId = this.getUserIdFromRequest(request);
    return await this.recipesService.createRecipe(createRecipeDto, authorId);
  }

  @ApiOperation({ summary: 'Get all recipes' })
  @ApiResponse({ status: 200 })
  @Get('/getAll')
  getAll() {
    return this.recipesService.getAllRecipes();
  }

  @ApiOperation({ summary: 'Get recipe by ID' })
  @ApiResponse({ status: 200 })
  @Get('/getOne/:id')
  getById(@Param('id') id: number) {
    return this.recipesService.getRecipeById(id);
  }

  @ApiOperation({ summary: 'Get recipes by user ID' })
  @ApiResponse({ status: 200 })
  @Get('/user/:userId')
  getByUserId(@Param('userId') userId: number) {
    return this.recipesService.getRecipesByUserId(userId);
  }

  @ApiOperation({ summary: 'Update recipe by ID' })
  @ApiResponse({ status: 200 })
  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() updateRecipeDto: UpdateRecipeDto, @Req() request: Request) {
    const authorId = this.getUserIdFromRequest(request);
    return await this.recipesService.updateRecipe(id, { ...updateRecipeDto, authorId });
  }

  @ApiOperation({ summary: 'Delete recipe by ID' })
  @ApiResponse({ status: 204 })
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.recipesService.deleteRecipe(id);
  }
}

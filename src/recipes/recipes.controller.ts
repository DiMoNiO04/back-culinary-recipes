import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './recipes.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @ApiOperation({ summary: 'Create recipe' })
  @ApiResponse({ status: 201, type: Recipe })
  @Post('/create')
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.createRecipe(createRecipeDto);
  }

  @ApiOperation({ summary: 'Get all recipes' })
  @ApiResponse({ status: 200, type: [Recipe] })
  @Get('/getAll')
  getAll() {
    return this.recipesService.getAllRecipes();
  }

  @ApiOperation({ summary: 'Get recipe by ID' })
  @ApiResponse({ status: 200, type: Recipe })
  @Get('/getOne/:id')
  getById(@Param('id') id: number) {
    return this.recipesService.getRecipeById(id);
  }

  @ApiOperation({ summary: 'Get recipes by user ID' })
  @ApiResponse({ status: 200, type: [Recipe] })
  @Get('user/:userId')
  getByUserId(@Param('userId') userId: number) {
    return this.recipesService.getRecipesByUserId(userId);
  }

  @ApiOperation({ summary: 'Update recipe by ID' })
  @ApiResponse({ status: 200, type: Recipe })
  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.updateRecipe(id, updateRecipeDto);
  }

  @ApiOperation({ summary: 'Delete recipe by ID' })
  @ApiResponse({ status: 204 })
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.recipesService.deleteRecipe(id);
  }
}

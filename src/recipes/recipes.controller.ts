import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './recipes.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post()
  @ApiResponse({ status: 201, type: Recipe })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.createRecipe(createRecipeDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Recipe] })
  getAll() {
    return this.recipesService.getAllRecipes();
  }
}

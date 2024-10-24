import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipes.model';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Category } from '../categories/categories.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe) private recipeRepository: typeof Recipe,
    @InjectModel(Category) private categoryRepository: typeof Category
  ) {}

  async createRecipe(dto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipeRepository.create(dto);
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return await this.recipeRepository.findAll({ include: [Category] }); // Включите категории в ответ
  }
}

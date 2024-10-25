import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipes.model';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Category } from '../categories/categories.model';
import { User } from '../users/users.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe) private recipeRepository: typeof Recipe,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  private async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private async validateRecipe(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findByPk(id, { include: [Category, User] });
    if (!recipe) throw new NotFoundException(`Recipe with id ${id} not found`);
    return recipe;
  }

  async createRecipe(dto: CreateRecipeDto, authorId: number): Promise<{ message: string; data: Recipe }> {
    await this.validateUser(authorId);
    const recipe = await this.recipeRepository.create({ ...dto });
    await recipe.$set('author', authorId);
    return { message: 'Recipe created successfully', data: recipe };
  }

  async getAllRecipes(): Promise<{ message: string; data: Recipe[] }> {
    const recipes = await this.recipeRepository.findAll({ include: [Category, User] });
    return { message: 'All recipes retrieved successfully', data: recipes };
  }

  async getRecipeById(id: number): Promise<{ message: string; data: Recipe }> {
    const recipe = await this.validateRecipe(id);
    return { message: `Recipe with id ${id} retrieved successfully`, data: recipe };
  }

  async getRecipesByUserId(userId: number): Promise<{ message: string; data: Recipe[] }> {
    await this.validateUser(userId);
    const recipes = await this.recipeRepository.findAll({
      where: { authorId: userId },
      include: [Category, User],
    });
    return { message: `Recipes for user with id ${userId} retrieved successfully`, data: recipes };
  }

  async updateRecipe(id: number, dto: UpdateRecipeDto): Promise<{ message: string; data: Recipe }> {
    const recipe = await this.validateRecipe(id);
    if (dto.authorId) await this.validateUser(dto.authorId);

    Object.assign(recipe, dto);
    await recipe.save();
    return { message: `Recipe with id ${id} updated successfully`, data: recipe };
  }

  async deleteRecipe(id: number): Promise<{ message: string }> {
    const recipe = await this.validateRecipe(id);
    await recipe.destroy();
    return { message: `Recipe with id ${id} deleted successfully` };
  }
}

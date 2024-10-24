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
    @InjectModel(Category) private categoryRepository: typeof Category,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async createRecipe(dto: CreateRecipeDto): Promise<Recipe> {
    const user = await this.userRepository.findByPk(dto.authorId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const recipe = await this.recipeRepository.create(dto);
    await recipe.$set('author', user);
    return recipe;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return await this.recipeRepository.findAll({ include: [Category, User] });
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findByPk(id, { include: [Category, User] });
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
    return recipe;
  }

  async getRecipesByUserId(userId: number): Promise<Recipe[]> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.recipeRepository.findAll({ where: { authorId: userId }, include: [Category, User] });
  }

  async updateRecipe(id: number, dto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    if (dto.title) recipe.title = dto.title;
    if (dto.shortDescription) recipe.shortDescription = dto.shortDescription;
    if (dto.addedDate) recipe.addedDate = dto.addedDate;
    if (dto.cookingTime) recipe.cookingTime = dto.cookingTime;
    if (dto.calories) recipe.calories = dto.calories;
    if (dto.image) recipe.image = dto.image;
    if (dto.ingredients) recipe.ingredients = dto.ingredients;
    if (dto.instructions) recipe.instructions = dto.instructions;
    if (dto.categoryId) recipe.categoryId = dto.categoryId;
    if (dto.authorId) {
      const user = await this.userRepository.findByPk(dto.authorId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      recipe.authorId = dto.authorId;
    }

    await recipe.save();
    return recipe;
  }

  async deleteRecipe(id: number): Promise<void> {
    const recipe = await this.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
    await recipe.destroy();
  }
}

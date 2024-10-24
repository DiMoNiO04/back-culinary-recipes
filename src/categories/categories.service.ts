import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Recipe } from 'src/recipes/recipes.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.create(dto);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.findAll({ include: [Recipe] });
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategoryById(id);
    return await category.update(dto);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);
    await category.destroy();
  }

  async getCategoryRecipes(id: number): Promise<Recipe[]> {
    const category = await this.getCategoryById(id);
    return await category.$get('recipes');
  }
}

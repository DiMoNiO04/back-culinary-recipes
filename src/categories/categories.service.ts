import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto, UpdateCategoryDto } from '.';
import { Recipe } from 'src/recipes/recipes.model';
import { User } from 'src/users/users.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category) {}

  private validateBase64Image(image: string): boolean {
    return /^data:image\/\w+;base64,/.test(image);
  }

  private async findCategoryWithRecipes(id: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id, {
      include: [
        {
          model: Recipe,
          attributes: [
            'id',
            'title',
            'shortDescription',
            'cookingTime',
            'calories',
            'image',
            'ingredients',
            'instructions',
            'createdAt',
          ],
          include: [
            { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            { model: Category, attributes: ['id', 'name', 'description', 'image'] },
          ],
        },
      ],
    });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async createCategory(dto: CreateCategoryDto): Promise<{ category: Category; message: string }> {
    // if (dto.image && !this.validateBase64Image(dto.image)) {
    //   throw new HttpException('Invalid image format', HttpStatus.BAD_REQUEST);
    // }
    const category = await this.categoryRepository.create({ ...dto });
    return { category, message: 'Category created successfully' };
  }

  async getAllCategories(): Promise<{ categories: Category[]; message: string }> {
    const categories = await this.categoryRepository.findAll({
      include: [
        {
          model: Recipe,
          attributes: [
            'id',
            'title',
            'shortDescription',
            'cookingTime',
            'calories',
            'image',
            'ingredients',
            'instructions',
            'createdAt',
          ],
          include: [{ model: User, attributes: ['id', 'firstName', 'lastName', 'email'] }],
        },
      ],
    });
    return { categories, message: 'All categories retrieved successfully' };
  }

  async getCategoryById(id: number): Promise<{ category: Category; message: string }> {
    const category = await this.findCategoryWithRecipes(id);
    return { category, message: 'Category retrieved successfully' };
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<{ category: Category; message: string }> {
    if (dto.image && !this.validateBase64Image(dto.image)) {
      throw new HttpException('Invalid image format', HttpStatus.BAD_REQUEST);
    }
    const category = await this.findCategoryWithRecipes(id);
    await category.update({ ...dto });
    return { category, message: 'Category updated successfully' };
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await this.findCategoryWithRecipes(id);
    await category.destroy();
    return { message: 'Category deleted successfully' };
  }

  async getCategoryRecipes(id: number): Promise<{ recipes: Recipe[]; message: string }> {
    const category = await this.findCategoryWithRecipes(id);
    const recipes = category.recipes || [];
    return { recipes, message: 'Recipes retrieved successfully' };
  }
}

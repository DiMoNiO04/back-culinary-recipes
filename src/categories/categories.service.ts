import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Recipe } from 'src/recipes/recipes.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private fileService: FilesService
  ) {}

  private async handleImage(image: string): Promise<string | null> {
    return image ? await this.fileService.createFile(image) : null;
  }

  async createCategory(dto: CreateCategoryDto, image: string): Promise<Category> {
    const fileName = await this.handleImage(image);
    return await this.categoryRepository.create({ ...dto, image: fileName });
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

  async updateCategory(id: number, dto: UpdateCategoryDto, image?: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    const fileName = await this.handleImage(image);

    return await category.update({ ...dto, image: fileName });
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await this.getCategoryById(id);

    if (category) {
      await category.destroy();
      return { message: 'Category deleted!' };
    } else {
      return { message: 'Category not deleted!' };
    }
  }

  async getCategoryRecipes(id: number): Promise<Recipe[]> {
    const category = await this.getCategoryById(id);
    return await category.$get('recipes');
  }
}

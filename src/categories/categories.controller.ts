import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from '.';
import { Category } from '.';
import { CategoriesService } from './categories.service';
import { Recipe } from 'src/recipes/recipes.model';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, type: Category })
  @Post('/create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('/getAll')
  getAll() {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/getOne/:id')
  getById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiOperation({ summary: 'Get recipes by category ID' })
  @ApiResponse({ status: 200, type: [Recipe] })
  @Get('/getRecipes/:id')
  getRecipesByCategory(@Param('id') id: number) {
    return this.categoriesService.getCategoryRecipes(id);
  }

  @ApiOperation({ summary: 'Update category by ID' })
  @ApiResponse({ status: 200, type: Category })
  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiResponse({ status: 204 })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}

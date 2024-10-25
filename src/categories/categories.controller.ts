import { Body, Controller, Get, Post, Patch, Delete, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './categories.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Recipe } from 'src/recipes/recipes.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, type: Category })
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() image) {
    const imageData = image?.buffer.toString('base64');
    return this.categoriesService.createCategory(createCategoryDto, imageData);
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
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFile() image) {
    const imageData = image?.buffer.toString('base64');
    return this.categoriesService.updateCategory(id, updateCategoryDto, imageData);
  }

  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiResponse({ status: 204 })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}

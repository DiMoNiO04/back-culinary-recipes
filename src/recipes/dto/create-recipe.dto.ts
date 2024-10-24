import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({ example: 'Цезарь', description: 'Recipe name' })
  readonly title: string;

  @ApiProperty({ example: 'Короткое описание', description: 'Short description' })
  readonly shortDescription: string;

  @ApiProperty({ example: '2024-10-24', description: 'Date added' })
  readonly addedDate: Date;

  @ApiProperty({ example: '30', description: 'Cooking time in minutes' })
  readonly cookingTime: number;

  // @ApiProperty({ example: '1', description: 'Author (user id)' })
  // readonly authorId: number;

  @ApiProperty({ example: '400', description: 'Calories' })
  readonly calories: number;

  @ApiProperty({ example: 'image.png', description: 'Recipe image' })
  readonly image: string;

  @ApiProperty({ example: 'Ингредиенты', description: 'Ingredients' })
  readonly ingredients: string;

  @ApiProperty({ example: 'Инструкция', description: 'Instructions' })
  readonly instructions: string;

  @ApiProperty({ example: '1', description: 'Category id' })
  readonly categoryId: number;
}

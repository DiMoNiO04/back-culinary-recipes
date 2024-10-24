import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({ example: 'Zesar', description: 'Recipe name' })
  readonly title: string;

  @ApiProperty({ example: 'Delicious salat', description: 'Short description' })
  readonly shortDescription: string;

  @ApiProperty({ example: '2024-10-24', description: 'Date added' })
  readonly addedDate: Date;

  @ApiProperty({ example: '30', description: 'Cooking time in minutes' })
  readonly cookingTime: number;

  @ApiProperty({ example: '400', description: 'Calories' })
  readonly calories: number;

  @ApiProperty({ example: 'image.png', description: 'Recipe image' })
  readonly image: string;

  @ApiProperty({ example: 'Potato', description: 'Ingredients' })
  readonly ingredients: string;

  @ApiProperty({ example: '1. Buy potato', description: 'Instructions' })
  readonly instructions: string;

  @ApiProperty({ example: '1', description: 'Category id' })
  readonly categoryId: number;

  @ApiProperty({ example: '1', description: 'Author id' })
  readonly authorId: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Soup', description: 'Category name' })
  readonly name: string;

  @ApiProperty({ example: 'Description', description: 'Category description' })
  readonly description: string;

  @ApiProperty({ example: 'image.png', description: 'Category image' })
  readonly image: string;
}

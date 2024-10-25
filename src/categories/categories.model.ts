import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Recipe } from 'src/recipes/recipes.model';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Salad', description: 'Category name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Category description', description: 'Category description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'image.png', description: 'Category image' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ApiProperty({ example: '5', description: 'Count of recipes in this category' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  count: number;

  @HasMany(() => Recipe)
  recipes: Recipe[];
}

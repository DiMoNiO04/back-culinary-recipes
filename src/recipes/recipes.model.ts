import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Category } from 'src/categories/categories.model';

@Table({ tableName: 'recipes' })
export class Recipe extends Model<Recipe> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Zesar', description: 'Recipe name' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Short description', description: 'Short description' })
  @Column({ type: DataType.STRING, allowNull: true })
  shortDescription: string;

  @ApiProperty({ example: '2024-10-24', description: 'Date added' })
  @Column({ type: DataType.DATE, allowNull: false })
  addedDate: Date;

  @ApiProperty({ example: '30', description: 'Cooking time in minutes' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  cookingTime: number;

  @ForeignKey(() => User)
  @ApiProperty({ example: '1', description: 'Author (user id)' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @ApiProperty({ example: '400', description: 'Calories' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  calories: number;

  @ApiProperty({ example: 'image.png', description: 'Recipe image' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ApiProperty({ example: 'Ingredients', description: 'Ingredients' })
  @Column({ type: DataType.TEXT, allowNull: false })
  ingredients: string;

  @ApiProperty({ example: 'Instructions', description: 'Instructions' })
  @Column({ type: DataType.TEXT, allowNull: false })
  instructions: string;

  @ForeignKey(() => Category)
  @ApiProperty({ example: '1', description: 'Category id' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}

import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Recipe } from '../recipes/recipes.model';

@Table({ tableName: 'favorites' })
export class Favorite extends Model<Favorite> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Recipe)
  @Column
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}

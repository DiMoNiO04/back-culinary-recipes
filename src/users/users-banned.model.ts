import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './users.model';

@Table({ tableName: 'users_banned' })
export class BlockedUser extends Model<BlockedUser> {
  @ApiProperty({ example: 'user@mail.com', description: 'Email of the banned user' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Spam activity', description: 'Reason for banning' })
  @Column({ type: DataType.STRING, allowNull: false })
  reason: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}

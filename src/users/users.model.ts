import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Dima', description: 'Username' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Razumov', description: `User's last name` })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Postal address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Banned or not' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'For hooliganism', description: 'Reason for blocking' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}

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

  @ApiProperty({ example: 'Alexandrovich', description: 'User patronymic' })
  @Column({ type: DataType.STRING, allowNull: true })
  surname: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Postal address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '80447104585', description: 'Phone number' })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @ApiProperty({ example: 'Belarus', description: 'Country' })
  @Column({ type: DataType.STRING, allowNull: true })
  country: string;

  @ApiProperty({ example: 'Minsk', description: 'City' })
  @Column({ type: DataType.STRING, allowNull: true })
  city: string;

  @ApiProperty({ example: '22-02-2002', description: 'Date of birth' })
  @Column({ type: DataType.DATE, allowNull: true })
  dateBirth: Date;

  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Banned or not' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'For hooliganism', description: 'Reason for blocking' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReasong: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}

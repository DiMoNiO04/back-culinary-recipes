import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Dima', description: 'Username' })
  readonly firstName: string;

  @ApiProperty({ example: 'Razumov', description: `User's last name` })
  readonly lastName: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Postal address' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  readonly password: string;

  @ApiProperty({ example: '0', description: 'Initial count of recipes' })
  readonly countrecipes?: number;
}

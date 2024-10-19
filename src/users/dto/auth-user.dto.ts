import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Postal address' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  readonly password: string;
}

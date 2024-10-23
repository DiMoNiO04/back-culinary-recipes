import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Dima', description: 'Username' })
  readonly firstName: string;

  @ApiProperty({ example: 'Razumov', description: `User's last name` })
  readonly lastName: string;
}

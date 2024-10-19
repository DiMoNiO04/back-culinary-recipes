import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role Title' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role Description' })
  readonly description: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Unique meaning of the role' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role Description' })
  readonly description: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class BannedUserDto {
  @ApiProperty({ example: 1, description: 'User ID to be blocked' }) userId: number;

  @ApiProperty({ example: 'Violation of terms', description: 'Reason for blocking' })
  reason: string;
}

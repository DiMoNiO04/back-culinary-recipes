import { ApiProperty } from '@nestjs/swagger';

export class UsersBannedDto {
  @ApiProperty({ example: 1, description: 'User ID to be banned' })
  userId: number;

  @ApiProperty({ example: 'Violation of terms', description: 'Reason for banning' })
  reason: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: '123456', description: 'Current password' })
  readonly currentPassword: string;

  @ApiProperty({ example: 'newPassword123', description: 'New password' })
  readonly newPassword: string;

  @ApiProperty({ example: 'newPassword123', description: 'Confirm new password' })
  readonly confirmPassword: string;
}

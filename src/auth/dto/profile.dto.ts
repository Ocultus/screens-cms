import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({ type: String, format: 'email' })
  email: string;
}

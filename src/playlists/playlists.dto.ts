import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  screenId: string;
}

export class UpdatePlaylistDto {
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsUUID()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  userId?: string;

  @IsUUID()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  screenId?: string;
}

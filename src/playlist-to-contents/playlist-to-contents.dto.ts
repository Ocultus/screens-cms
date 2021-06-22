import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreatePlaylistToContentDto {
  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  playlistId: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  contentId: string;

  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  position?: number;

  @ApiPropertyOptional()
  @IsOptional()
  playTime?: number;
}

export class UpdatePlaylistToContentDto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  playlistId?: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  contentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  position?: number;

  @ApiProperty()
  @IsOptional()
  playTime?: number;
}

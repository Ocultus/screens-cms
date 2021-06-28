import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, Min } from 'class-validator';

export class CreatePlaylistToContentDto {
  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  playlistId: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  contentId: string;

  @Min(1)
  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  position?: number;

  @Min(1)
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

export class ResponsePlaylistToContentDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, format: 'uuid' })
  playlistId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  contentId: string;

  @ApiProperty({ type: 'integer' })
  position: number;

  @ApiProperty()
  playTime: number;
}

export class ResponsePlaylistToContentsDto {
  @ApiProperty({ type: () => [ResponsePlaylistToContentDto] })
  playlistToContent: ResponsePlaylistToContentDto[];
}

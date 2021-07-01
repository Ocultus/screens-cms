import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, Min } from 'class-validator';

export class CreatePlaylistToContentGroupDto {
  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  playlistId: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  contentGroupId: string;

  @Min(1)
  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  position?: number;

  @Min(1)
  @ApiPropertyOptional()
  @IsOptional()
  playTime?: number;
}

export class UpdatePlaylistToContentGroupDto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  playlistId?: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  contentGroupId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  position?: number;

  @ApiProperty()
  @IsOptional()
  playTime?: number;
}

export class ResponsePlaylistToContentGroupDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, format: 'uuid' })
  playlistId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  contentGroupId: string;

  @ApiProperty({ type: 'integer' })
  position: number;

  @ApiProperty()
  playTime: number;
}

export class ResponsePlaylistToContentGroupsDto {
  @ApiProperty({ type: () => [ResponsePlaylistToContentGroupDto] })
  playlistToContent: ResponsePlaylistToContentGroupDto[];
}

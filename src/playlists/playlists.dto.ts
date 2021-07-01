import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @ApiProperty()
  name: string;
}

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  screenId?: string;
}

export class ResponsePlaylistDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  screenId: string;
}

export class ResponsePlaylistsDto {
  @ApiProperty({ type: () => [ResponsePlaylistDto] })
  playlists: ResponsePlaylistDto[];
}

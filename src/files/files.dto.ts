import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @ApiProperty()
  category: string;
}

export class UpdateFileDto {
  @IsString()
  @ApiPropertyOptional()
  category?: string;
  @IsUUID()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  contentid?: string;
}

export class ResponseFileDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;
  @ApiProperty({ type: String, format: 'uri' })
  url: string;
  @ApiProperty()
  key: string;
  @ApiProperty()
  category: string;
  @ApiProperty({ type: String, format: 'uuid' })
  contentId: string;
}

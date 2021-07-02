import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @ApiProperty()
  category: string;
}

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  category?: string;
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  contentGroupid?: string;
}

export class ResponseContentDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;
  @ApiProperty({ type: String, format: 'uri' })
  url: string;
  @ApiProperty()
  key: string;
  @ApiProperty()
  category: string;
  @ApiProperty({ type: String, format: 'uuid' })
  contentGroupId: string;
}

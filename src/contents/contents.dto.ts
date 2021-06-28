import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ContentType } from './content.entity';

export class CreateContentDto {
  @IsUrl()
  @ApiProperty({ type: String, format: 'uri' })
  url: string;

  @IsEnum(ContentType)
  @ApiProperty({ enum: ContentType, enumName: 'ContentType' })
  contentType: ContentType;
}

export class UpdateContentDto {
  @IsUrl()
  @IsOptional()
  @ApiProperty({ type: String, format: 'uri' })
  url?: string;

  @IsEnum(ContentType)
  @IsOptional()
  @ApiPropertyOptional({ enum: ContentType, enumName: 'ContentType' })
  contentType?: ContentType;
}

export class ResponseContentDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, format: 'uri' })
  url: string;

  @ApiProperty({ enum: ContentType, enumName: 'ContentType' })
  contentType: ContentType;
}

export class ResponseContentsDto {
  @ApiProperty({ type: () => [ResponseContentDto] })
  contents: ResponseContentDto[];
}

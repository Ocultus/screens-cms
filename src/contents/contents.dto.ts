import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ContentType } from './content.entity';

export class CreateContentDto {
  @IsEnum(ContentType)
  @ApiProperty({ enum: ContentType, enumName: 'ContentType' })
  contentType: ContentType;
}

export class UpdateContentDto {
  @IsEnum(ContentType)
  @IsOptional()
  @ApiPropertyOptional({ enum: ContentType, enumName: 'ContentType' })
  contentType?: ContentType;
}

export class ResponseContentDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ enum: ContentType, enumName: 'ContentType' })
  contentType: ContentType;
}

export class ResponseContentsDto {
  @ApiProperty({ type: () => [ResponseContentDto] })
  contents: ResponseContentDto[];
}

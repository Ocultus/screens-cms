import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ContentGroupType } from './content-group.entity';

export class CreateContentGroupDto {
  @IsEnum(ContentGroupType)
  @ApiProperty({ enum: ContentGroupType, enumName: 'ContentGroupType' })
  contentType: ContentGroupType;
}

export class UpdateContentGroupDto {
  @IsEnum(ContentGroupType)
  @IsOptional()
  @ApiPropertyOptional({ enum: ContentGroupType, enumName: 'ContentGroupType' })
  contentType?: ContentGroupType;
}

export class ResponseContentGroupDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ enum: ContentGroupType, enumName: 'ContentGroupType' })
  contentType: ContentGroupType;
}

export class ResponseContentGroupsDto {
  @ApiProperty({ type: () => [ResponseContentGroupDto] })
  contents: ResponseContentGroupDto[];
}

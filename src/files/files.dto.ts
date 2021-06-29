import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @ApiProperty()
  category: string;
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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateScreenDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;
}

export class UpdateScreenDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  userId?: string;
}

export class ResponseScreenDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;
}

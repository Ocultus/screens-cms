import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;
}

export class UpdateEventDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  userId?: string;
}

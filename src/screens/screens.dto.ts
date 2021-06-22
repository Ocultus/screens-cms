import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateScreenDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsUUID()
  @ApiProperty({ type: String, format: 'uuid' })
  eventId: string;
}

export class UpdateScreenDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  eventId?: string;
}

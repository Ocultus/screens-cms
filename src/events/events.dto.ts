import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  name: string;
}

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;
}

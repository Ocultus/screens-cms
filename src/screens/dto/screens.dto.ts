import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateScreenDto {
  @IsString()
  @ApiProperty()
  title: string;
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

export class ResponseScreenDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  eventId: string;
}

export class ResponseScreensDto {
  @ApiProperty({ type: () => [ResponseScreenDto] })
  screens: ResponseScreenDto[];
}

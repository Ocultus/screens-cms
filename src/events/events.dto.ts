import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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

export class ResponseEventDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;
}

export class ResponseEventsDto {
  @ApiProperty({ type: () => [ResponseEventDto] })
  events: ResponseEventDto[];
}

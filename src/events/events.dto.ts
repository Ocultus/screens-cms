import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;
}

export class UpdateEventDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  userId?: string;
}

export class ResponseEventDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;

  /*
  @ApiProperty({ type: () => })
  screens?: Screen[];

  @ApiProperty({ type: () => })
  user?: User;
  */
}

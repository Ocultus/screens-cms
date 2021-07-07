import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { ContentGroup } from './content-group.entity';

export class CreateContentGroupDto extends PickType(ContentGroup, [
  'contentType',
]) {}

export class UpdateContentGroupDto extends PartialType(CreateContentGroupDto) {}

export class ResponseContentGroupDto extends PickType(ContentGroup, [
  'id',
  'contentType',
]) {}

export class ResponseContentGroupsDto {
  @ApiProperty({ type: () => [ResponseContentGroupDto] })
  contents: ResponseContentGroupDto[];
}

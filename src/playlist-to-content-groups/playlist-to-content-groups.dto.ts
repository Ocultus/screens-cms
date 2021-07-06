import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PlaylistToContentGroup } from './playlist-to-content-group.entity';

export class CreatePlaylistToContentGroupDto extends OmitType(
  PlaylistToContentGroup,
  ['playlist', 'contentGroup', 'id'],
) {}

export class UpdatePlaylistToContentGroupDto extends PartialType(
  CreatePlaylistToContentGroupDto,
) {}

export class ResponsePlaylistToContentGroupDto extends OmitType(
  PlaylistToContentGroup,
  ['playlist', 'contentGroup'],
) {}

export class ResponsePlaylistToContentGroupsDto {
  @ApiProperty({ type: () => [ResponsePlaylistToContentGroupDto] })
  playlistToContent: ResponsePlaylistToContentGroupDto[];
}

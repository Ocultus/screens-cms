import { SerializeOptions } from '@nestjsx/crud';
import { ResponsePlaylistToContentDto } from './playlist-to-contents.dto';

export const serialize: SerializeOptions = {
  create: ResponsePlaylistToContentDto,
  update: ResponsePlaylistToContentDto,
  //get: ResponsePlaylistToContentDto,
};

import { EntityRepository, Repository } from 'typeorm';
import { PlaylistToContent } from './playlist-to-content.entity';

@EntityRepository(PlaylistToContent)
export class PlaylistToContentRepository extends Repository<PlaylistToContent> {}

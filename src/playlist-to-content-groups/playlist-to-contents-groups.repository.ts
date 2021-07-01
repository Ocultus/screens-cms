import { EntityRepository, Repository } from 'typeorm';
import { PlaylistToContentGroup } from './playlist-to-content-group.entity';

@EntityRepository(PlaylistToContentGroup)
export class PlaylistToContentGroupRepository extends Repository<PlaylistToContentGroup> {}

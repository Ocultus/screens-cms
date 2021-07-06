import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistService } from '../services/playlists.service';

@Injectable()
export class CheckPlaylistOwnerGuard implements CanActivate {
  constructor(readonly playlistService: PlaylistService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const countOfPlaylist = await this.playlistService.count({
      where: {
        id: request.params.id,
        userId: request.user.id,
      },
    });
    return !!countOfPlaylist;
  }
}

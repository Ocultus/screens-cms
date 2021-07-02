import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistService } from '../services/playlists.service';

@Injectable()
export class CheckPlaylistOwnerGuard implements CanActivate {
  constructor(readonly playlistService: PlaylistService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const playlist = await this.playlistService.findOne(request.params.id);
    return playlist?.userId === request.user?.id;
  }
}

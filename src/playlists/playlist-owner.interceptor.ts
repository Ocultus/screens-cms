import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PlaylistService } from './services/playlists.service';

@Injectable()
export class CheckPlaylistOwnerInterceptor implements NestInterceptor {
  constructor(private readonly playlistService: PlaylistService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const foundPlaylist = await this.playlistService.findOne(
      request.body.playlistId,
    );
    if (!foundPlaylist) {
      throw new NotFoundException('Playlist don`t exists');
    }
    return next.handle();
  }
}

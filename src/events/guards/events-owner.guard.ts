import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { EventService } from '../services/events.service';

@Injectable()
export class CheckEventOwnerGuard implements CanActivate {
  constructor(readonly eventService: EventService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const countOfEvent = await this.eventService.count({
      where: {
        userId: request.user.id,
        id: request.params.id,
      },
    });
    return countOfEvent > 0 ? true : false;
  }
}

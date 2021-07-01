import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { EventService } from '../services/events.service';

@Injectable()
export class CheckEventOwnerGuard implements CanActivate {
  constructor(readonly eventService: EventService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const event = await this.eventService.findOne(request.params.id);
    return event?.userId === request.user?.sub;
  }
}

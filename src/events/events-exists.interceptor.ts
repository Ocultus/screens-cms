import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventService } from './services/events.service';

@Injectable()
export class CheckEventExistsInterceptor implements NestInterceptor {
  constructor(private eventService: EventService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const eventId = request.body.eventId || request.params.id;
    const foundEvent = await this.eventService.findOne(eventId);
    if (!foundEvent) {
      throw new NotFoundException('Event don`t exists');
    }
    return next.handle();
  }
}

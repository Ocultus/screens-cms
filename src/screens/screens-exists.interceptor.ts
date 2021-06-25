import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ScreenService } from './services/screens.service';

@Injectable()
export class CheckScreenExistsInterceptor implements NestInterceptor {
  constructor(private eventService: ScreenService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const screenId = request.body.screenId;
    const foundScreen = await this.eventService.findOne(screenId);
    if (!foundScreen) {
      throw new NotFoundException('Screen don`t exists');
    }
    return next.handle();
  }
}

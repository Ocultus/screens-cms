import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContentService } from './services/contents.service';

@Injectable()
export class CheckContentOwnerInterceptor implements NestInterceptor {
  constructor(private readonly contentService: ContentService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const content = await this.contentService.findOne(request.body.contentId);
    if (!content) {
      throw new NotFoundException('Content don`t found');
    }
    return next.handle();
  }
}

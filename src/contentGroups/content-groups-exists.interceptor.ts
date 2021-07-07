import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContentGroupService } from './services/content-groups.service';

@Injectable()
export class CheckContentGroupExistsInterceptor implements NestInterceptor {
  constructor(private readonly contentService: ContentGroupService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const contentGroup = await this.contentService.findOne(
      request.body.contentGroupId || request.params.id,
    );
    if (!contentGroup) {
      throw new NotFoundException('Content group don`t found');
    }
    return next.handle();
  }
}

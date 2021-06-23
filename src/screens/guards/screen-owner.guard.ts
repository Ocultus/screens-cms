import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ScreenService } from '../services/screens.service';

@Injectable()
export class CheckScreenOwnerGuard implements CanActivate {
  constructor(private screenService: ScreenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const screen = await this.screenService.findOne(request.params.id);
    return screen?.userId === request.user?.id;
  }
}

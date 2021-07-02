import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ScreenService } from '../services/screens.service';

@Injectable()
export class CheckScreenOwnerGuard implements CanActivate {
  constructor(private screenService: ScreenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const countOfScreen = await this.screenService.count({
      where: {
        userId: request.user.id,
        id: request.params.id,
      },
    });
    return countOfScreen > 0 ? true : false;
  }
}

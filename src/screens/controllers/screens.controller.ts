import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';
import { CheckScreenOwnerGuard } from '../guards/screen-owner.guard';
import { CreateScreenDto, UpdateScreenDto } from '../screens.dto';
import { ScreenService } from '../services/screens.service';
import { Screen } from '../screen.entity';
import { CheckEventOwnerInterceptor } from 'src/events/event-owner.interceptor';

@Crud({
  model: {
    type: Screen,
  },
  dto: {
    create: CreateScreenDto,
    update: UpdateScreenDto,
  },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getManyBase',
      'getOneBase',
      'updateOneBase',
    ],
    createOneBase: {
      interceptors: [CheckEventOwnerInterceptor],
    },
    deleteOneBase: {
      decorators: [UseGuards(CheckScreenOwnerGuard)],
    },
    updateOneBase: {
      interceptors: [CheckEventOwnerInterceptor],
      decorators: [UseGuards(CheckScreenOwnerGuard)],
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    userId: user.id,
  }),
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('screens')
@Controller('screens')
export class ScreenController implements CrudController<Screen> {
  constructor(readonly service: ScreenService) {}
}

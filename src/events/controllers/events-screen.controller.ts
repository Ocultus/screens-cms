import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateScreenDto, ResponseScreensDto } from 'src/screens/screens.dto';
import { EventScreenService } from '../services/events-screen.service';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { Screen } from 'src/screens/screen.entity';
import { User } from 'src/users/user.entity';
import { CheckEventExistsInterceptor } from '../events-exists.interceptor';

@Crud({
  model: {
    type: Screen,
  },
  routes: {
    only: ['createOneBase', 'getManyBase'],
    createOneBase: {
      interceptors: [CheckEventExistsInterceptor],
    },
  },
  dto: {
    create: CreateScreenDto,
  },
  serialize: {
    getMany: ResponseScreensDto,
  },
  params: {
    eventId: {
      field: 'eventId',
      type: 'uuid',
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
@ApiTags('events')
@Controller('events/:eventId/screens')
export class EventScreenController implements CrudController<Screen> {
  constructor(readonly service: EventScreenService) {}
}

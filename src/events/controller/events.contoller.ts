import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckEventOwnerGuard } from '../guards/event-owner.guard';
import { CreateEventDto, UpdateEventDto } from '../events.dto';
import { EventService } from '../services/events.service';
import { Event } from '../event.entity';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Crud({
  model: {
    type: Event,
  },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getManyBase',
      'getOneBase',
      'updateOneBase',
    ],
    deleteOneBase: {
      decorators: [UseGuards(CheckEventOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(CheckEventOwnerGuard)],
    },
  },
  dto: {
    create: CreateEventDto,
    update: UpdateEventDto,
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
@ApiTags('events')
@Controller('events')
export class EventContoller implements CrudController<Event> {
  constructor(readonly service: EventService) {}
}

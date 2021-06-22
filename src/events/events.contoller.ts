import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { EventService } from './services/events.service';
import { Event } from './event.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEventDto, UpdateEventDto } from './events.dto';
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
  filter: (user: User) => ({
    userId: user.id,
  }),
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

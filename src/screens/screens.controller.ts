import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';
import { Screen } from './screen.entity';
import { CreateScreenDto, UpdateScreenDto } from './screens.dto';
import { ScreenService } from './services/screens.service';

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
@ApiTags('screens')
@Controller('screens')
export class ScreenController implements CrudController<Screen> {
  constructor(readonly service: ScreenService) {}
}

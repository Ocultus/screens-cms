import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';
import { Content } from './content.entity';
import { CreateContentDto, UpdateContentDto } from './contents.dto';
import { ContentService } from './services/contents.service';

@Crud({
  model: {
    type: Content,
  },
  dto: {
    create: CreateContentDto,
    update: UpdateContentDto,
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
    id: user.id,
  }),
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('contents')
@Controller('contents')
export class ContentController implements CrudController<Content> {
  constructor(readonly service: ContentService) {}
}

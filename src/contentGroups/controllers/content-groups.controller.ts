import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ContentGroup } from '../content-group.entity';
import {
  CreateContentGroupDto,
  ResponseContentGroupDto,
  ResponseContentGroupsDto,
  UpdateContentGroupDto,
} from '../content-groups.dto';
import { ContentGroupService } from '../services/content-groups.service';

@Crud({
  model: {
    type: ContentGroup,
  },
  dto: {
    create: CreateContentGroupDto,
    update: UpdateContentGroupDto,
  },
  serialize: {
    create: ResponseContentGroupDto,
    update: ResponseContentGroupDto,
    get: ResponseContentGroupDto,
    getMany: ResponseContentGroupsDto,
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
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('content-groups')
@Controller('content-groups')
export class ContentGroupController implements CrudController<ContentGroup> {
  constructor(readonly service: ContentGroupService) {}
}

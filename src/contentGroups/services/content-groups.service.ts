import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentGroup } from '../content-group.entity';
import { ContentGroupRepository } from '../content-groups.repository';

@Injectable()
export class ContentGroupService extends TypeOrmCrudService<ContentGroup> {
  constructor(readonly repository: ContentGroupRepository) {
    super(repository);
  }
}

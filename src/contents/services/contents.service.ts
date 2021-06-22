import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Content } from '../content.entity';
import { ContentRepository } from '../contents.repository';

@Injectable()
export class ContentService extends TypeOrmCrudService<Content> {
  constructor(readonly repository: ContentRepository) {
    super(repository);
  }
}

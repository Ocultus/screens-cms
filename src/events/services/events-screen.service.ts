import { Injectable } from '@nestjs/common';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ScreenRepository } from 'src/screens/screens.repository';
import { Screen } from '../../screens/screen.entity';

@Injectable()
export class EventScreenService extends TypeOrmCrudService<Screen> {
  constructor(readonly repository: ScreenRepository) {
    super(repository);
  }
}

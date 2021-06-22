import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ScreenRepository } from '../screens.repository';
import { Screen } from '../screen.entity';

@Injectable()
export class ScreenService extends TypeOrmCrudService<Screen> {
  constructor(readonly repository: ScreenRepository) {
    super(repository);
  }
}

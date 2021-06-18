import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ScreenRepository)
export class ScreenRepository extends Repository<Screen> {}

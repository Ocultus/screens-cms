import { EntityRepository, Repository } from 'typeorm';
import { Screen } from 'src/screens/screen.entity';

@EntityRepository(Screen)
export class ScreenRepository extends Repository<Screen> {}

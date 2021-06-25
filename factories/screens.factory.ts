import { define } from 'typeorm-seeding';
import { Screen } from 'src/screens/screen.entity';
import * as faker from 'faker';

define(Screen, () => {
  const screen = new Screen();
  screen.id = faker.datatype.uuid();
  screen.title = faker.name.title();
  return screen;
});

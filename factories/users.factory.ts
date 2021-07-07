import * as faker from 'faker';
import { User } from '../src/users/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();
  user.id = faker.datatype.string();
  user.email = faker.internet.email();

  return user;
});

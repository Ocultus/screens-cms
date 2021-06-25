import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { User } from '../src/users/user.entity';
import { define } from 'typeorm-seeding';
import { CRYPTO_ROUND } from '../src/config/configuration';
define(User, () => {
  const user = new User();
  user.id = faker.datatype.uuid();
  user.email = faker.internet.email();
  const password = faker.internet.password();
  const hashedPassword = bcrypt.hashSync(password, CRYPTO_ROUND);
  user.password = hashedPassword;

  return user;
});

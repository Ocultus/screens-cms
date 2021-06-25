import * as faker from 'faker';
import { define } from 'typeorm-seeding';
import { Content, ContentType } from '../src/contents/content.entity';

define(Content, () => {
  const content = new Content();
  content.id = faker.datatype.uuid();
  content.url = faker.internet.url();
  content.contentType = ContentType.html;
  return content;
});

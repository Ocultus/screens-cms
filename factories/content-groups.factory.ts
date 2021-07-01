import * as faker from 'faker';
import {
  ContentGroup,
  ContentGroupType,
} from 'src/contentGroups/content-group.entity';
import { define } from 'typeorm-seeding';

define(ContentGroup, () => {
  const content = new ContentGroup();
  content.id = faker.datatype.uuid();
  content.contentType = ContentGroupType.html;
  return content;
});

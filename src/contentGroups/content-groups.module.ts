import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentGroupController } from './controllers/content-groups.controller';
import { ContentGroupRepository } from './content-groups.repository';
import { ContentGroupService } from './services/content-groups.service';
import { ContentGroupContentController } from './controllers/content-group-contents.controller';
import { ContentGroupContentSerivce } from './services/content-group-contents.service';
import { ContentRepository } from 'src/contents/contents.repository';

@Module({
  providers: [ContentGroupService, ContentGroupContentSerivce],
  imports: [
    TypeOrmModule.forFeature([ContentGroupRepository, ContentRepository]),
  ],
  controllers: [ContentGroupController, ContentGroupContentController],
  exports: [ContentGroupService],
})
export class ContentGroupModule {}

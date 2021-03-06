import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';
import { ContentController } from './contents.controller';
import { ContentRepository } from './contents.repository';
import { ContentService } from './services/content.service';

@Module({
  providers: [ContentService],
  imports: [
    TypeOrmModule.forFeature([ContentRepository, ContentGroupRepository]),
    ContentModule,
  ],
  controllers: [ContentController],
})
export class ContentModule {}

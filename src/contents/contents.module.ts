import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './controllers/contents.controller';
import { ContentRepository } from './contents.repository';
import { ContentService } from './services/contents.service';
import { ContentFileSerivce } from './services/content-files.service';
import { ContentFileController } from './controllers/content-files.controller';
import { FileRepository } from 'src/files/files.repository';

@Module({
  providers: [ContentService, ContentFileSerivce],
  imports: [TypeOrmModule.forFeature([ContentRepository, FileRepository])],
  controllers: [ContentController, ContentFileController],
  exports: [ContentService],
})
export class ContentModule {}

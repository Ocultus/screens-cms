import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './contents.controller';
import { ContentRepository } from './contents.repository';
import { ContentService } from './services/contents.service';

@Module({
  providers: [ContentService],
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  controllers: [ContentController],
})
export class ContentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './contents.repository';
import { ContentService } from './services/contents.service';

@Module({
  providers: [ContentService],
  imports: [TypeOrmModule.forFeature([ContentRepository])],
})
export class ContentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from 'src/contents/contents.module';
import { FileController } from './files.controller';
import { FileRepository } from './files.repository';
import { FileService } from './services/files.service';

@Module({
  providers: [FileService],
  imports: [TypeOrmModule.forFeature([FileRepository]), ContentModule],
  controllers: [FileController],
})
export class FileModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './files.controller';
import { FileRepository } from './files.repository';
import { FileService } from './services/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository])],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}

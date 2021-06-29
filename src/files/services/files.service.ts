import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FileRepository } from '../files.repository';
import { File } from '../file.entity';

@Injectable()
export class FileService extends TypeOrmCrudService<File> {
  constructor(readonly repository: FileRepository) {
    super(repository);
  }
}

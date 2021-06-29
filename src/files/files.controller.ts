import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { File } from '../files/file.entity';
import { FileService } from './services/files.service';

@Crud({
  model: {
    type: File,
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('files')
@Controller('files')
export class FileController implements CrudController<File> {
  constructor(readonly service: FileService) {}
}

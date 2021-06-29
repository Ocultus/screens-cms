import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { File } from './file.entity';
import { ResponseFileDto, UpdateFileDto } from './files.dto';
import { FileService } from './services/files.service';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(private readonly service: FileService) {}
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get a single file' })
  @ApiOkResponse({ description: '', type: ResponseFileDto })
  @Get(':id')
  async findOne(@Param('id') id: File['id']): Promise<ResponseFileDto> {
    return this.service.findOne(id);
  }

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update a single file' })
  @ApiOkResponse({
    description: 'File was successfully updated',
    type: ResponseFileDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Put(':id')
  async update(
    @Param('id') id: File['id'],
    @Body() updateFileDto: UpdateFileDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<ResponseFileDto> {
    return this.service.update(
      id,
      updateFileDto,
      file?.buffer,
      file?.originalname,
    );
  }

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete a single file' })
  @ApiOkResponse({ description: 'File was successfully deleted' })
  @Delete(':id')
  async delete(@Param('id') id: File['id']): Promise<void> {
    return this.service.delete(id);
  }
}

import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { ContentFileSerivce } from '../services/content-files.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto, ResponseFileDto } from 'src/files/files.dto';
import { Content } from '../content.entity';
import { CheckContentExistsInterceptor } from '../contents-exists.interceptor';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('contents')
@Controller('contents')
export class ContentFileController {
  constructor(private readonly contentFileService: ContentFileSerivce) {}

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Create a single file' })
  @ApiOkResponse({
    description: 'The screens have been successfully found',
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
  @UseInterceptors(CheckContentExistsInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/file')
  async create(
    @Param('id')
    contentId: Content['id'],
    @UploadedFile('file') file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
  ): Promise<ResponseFileDto> {
    return this.contentFileService.create(
      createFileDto,
      file.buffer,
      file.originalname,
      contentId,
    );
  }
}

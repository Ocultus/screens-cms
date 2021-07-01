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
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentGroupContentSerivce } from '../services/content-group-contents.service';
import {
  CreateContentDto,
  ResponseContentDto,
} from 'src/contents/contents.dto';
import { ContentGroup } from '../content-group.entity';
import { CheckContentGroupExistsInterceptor } from '../content-groups-exists.interceptor';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('content-groups')
@Controller('content-groups')
export class ContentGroupContentController {
  constructor(
    private readonly contentGroupContentService: ContentGroupContentSerivce,
  ) {}

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Create a single content' })
  @ApiOkResponse({
    description: 'The content have been successfully created',
    type: ResponseContentDto,
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
        category: {
          type: 'varchar',
        },
      },
    },
  })
  @UseInterceptors(CheckContentGroupExistsInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/content')
  async create(
    @Param('id')
    contentGroupId: ContentGroup['id'],
    @UploadedFile('file') file: Express.Multer.File,
    @Body() createContentDto: CreateContentDto,
  ): Promise<ResponseContentDto> {
    return this.contentGroupContentService.create(
      createContentDto,
      file?.buffer,
      file?.originalname,
      contentGroupId,
    );
  }
}

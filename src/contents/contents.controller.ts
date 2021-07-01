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
import { Content } from './content.entity';
import { ResponseContentDto, UpdateContentDto } from './contents.dto';
import { ContentService } from './services/content.service';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('contents')
@Controller('contents')
export class ContentController {
  constructor(private readonly service: ContentService) {}
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get a single content' })
  @ApiOkResponse({ description: '', type: ResponseContentDto })
  @Get(':id')
  async findOne(@Param('id') id: Content['id']): Promise<ResponseContentDto> {
    return this.service.findOne(id);
  }

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update a single content' })
  @ApiOkResponse({
    description: 'Content was successfully updated',
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
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Put(':id')
  async update(
    @Param('id') id: Content['id'],
    @Body() updateContentDto: UpdateContentDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<ResponseContentDto> {
    return this.service.update(
      id,
      updateContentDto,
      file?.buffer,
      file?.originalname,
    );
  }

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete a single content' })
  @ApiOkResponse({ description: 'Content was successfully deleted' })
  @Delete(':id')
  async delete(@Param('id') id: Content['id']): Promise<void> {
    return this.service.delete(id);
  }
}

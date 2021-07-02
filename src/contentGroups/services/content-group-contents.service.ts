import { InjectRepository } from '@nestjs/typeorm';
import { ContentGroup } from '../content-group.entity';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import { AWS_BUCKET_NAME } from 'src/config/configuration';
import { S3ResponseDto } from 'src/contents/types/s3-response';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ContentRepository } from 'src/contents/contents.repository';
import {
  CreateContentDto,
  ResponseContentDto,
} from 'src/contents/dto/contents.dto';

export class ContentGroupContentSerivce {
  constructor(
    @InjectRepository(ContentRepository)
    private readonly repository: ContentRepository,
  ) {}

  async create(
    createContentDto: CreateContentDto,
    fileBuffer: Buffer,
    fileName: string,
    contentGroupId: ContentGroup['id'],
  ): Promise<ResponseContentDto> {
    if (!fileName || !fileBuffer) {
      throw new BadRequestException('File not attach');
    }
    const s3Response = await this.uploadFile(fileBuffer, fileName);
    return await this.repository.save({
      ...createContentDto,
      ...s3Response,
      contentGroupId,
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    filename: string,
  ): Promise<S3ResponseDto> {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: AWS_BUCKET_NAME,
          Body: fileBuffer,
          Key: `${uuid()}-${filename}`,
        })
        .promise();
      return { key: uploadResult.Key, url: uploadResult.Location };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

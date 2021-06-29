import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDto, ResponseFileDto } from 'src/files/files.dto';
import { FileRepository } from 'src/files/files.repository';
import { Content } from '../content.entity';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import { AWS_BUCKET_NAME } from 'src/config/configuration';
import { S3ResponseDto } from 'src/files/types/s3-response';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class ContentFileSerivce {
  constructor(
    @InjectRepository(FileRepository)
    private readonly repository: FileRepository,
  ) {}

  async create(
    createFileDto: CreateFileDto,
    fileBuffer: Buffer,
    fileName: string,
    contentId: Content['id'],
  ): Promise<ResponseFileDto> {
    if (!fileName || !fileBuffer) {
      throw new BadRequestException('File not attach');
    }
    const s3Response = await this.uploadFile(fileBuffer, fileName);
    return await this.repository.save({
      ...createFileDto,
      ...s3Response,
      contentId,
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

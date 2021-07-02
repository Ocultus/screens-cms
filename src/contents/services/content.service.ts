import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ContentRepository } from '../contents.repository';
import { Content } from '../content.entity';
import { S3 } from 'aws-sdk';
import { ResponseContentDto, UpdateContentDto } from '../dto/contents.dto';
import { S3ResponseDto } from '../types/s3-response';
import { v4 as uuid } from 'uuid';
import { AWS_BUCKET_NAME } from 'src/config/configuration';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentGroupRepository } from 'src/contentGroups/content-groups.repository';

@Injectable()
export class ContentService {
  constructor(
    private readonly repository: ContentRepository,
    @InjectRepository(ContentGroupRepository)
    private readonly сontentGroupRepository: ContentGroupRepository,
  ) {}

  async findOne(id: string): Promise<ResponseContentDto> {
    return this.repository.findOne(id);
  }

  async update(
    id: string,
    updateContentDto: UpdateContentDto,
    fileBuffer: Buffer,
    fileName: string,
  ): Promise<ResponseContentDto> {
    const file = await this.repository.findOne(id);
    if (!file) {
      throw new NotFoundException('Content don`t exists');
    }
    if (updateContentDto.contentGroupid) {
      const groupContent = await this.сontentGroupRepository.findOne(
        updateContentDto.contentGroupid,
      );
      if (!groupContent) {
        throw new NotFoundException('Group content not found');
      }
    }
    if (fileName && fileBuffer) {
      const s3Response = await this.uploadContent(fileBuffer, fileName);
      return await this.repository.save({
        ...file,
        ...s3Response,
        ...updateContentDto,
      });
    } else {
      return await this.repository.save({ ...file, ...updateContentDto });
    }
  }

  async delete(id: Content['id']): Promise<void> {
    const file = await this.repository.findOne(id);
    if (file) {
      this.deleteS3Content(file);
      await this.repository.remove(file);
    }
  }

  async uploadContent(
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

  async deleteS3Content(file: Content): Promise<void> {
    try {
      const s3 = new S3();
      await s3
        .deleteObject({
          Bucket: AWS_BUCKET_NAME,
          Key: file.key,
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

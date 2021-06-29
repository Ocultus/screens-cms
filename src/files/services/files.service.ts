import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FileRepository } from '../files.repository';
import { File } from '../file.entity';
import { S3 } from 'aws-sdk';
import { AWS_BUCKET_NAME } from 'src/config/configuration';
import { ResponseFileDto, UpdateFileDto } from '../files.dto';
import { S3ResponseDto } from '../types/s3-response';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(private readonly repository: FileRepository) {}

  async findOne(id: File['id']): Promise<ResponseFileDto> {
    return this.repository.findOne(id);
  }

  async update(
    id: string,
    updateFileDto: UpdateFileDto,
    fileBuffer: Buffer,
    fileName: string,
  ): Promise<ResponseFileDto> {
    const file = await this.repository.findOne(id);
    if (!file) {
      throw new NotFoundException('File don`t exists');
    }
    if (fileName && fileBuffer) {
      const s3Response = await this.uploadFile(fileBuffer, fileName);
      return await this.repository.save({
        ...file,
        ...s3Response,
        ...updateFileDto,
      });
    } else {
      return await this.repository.save({ ...file, ...updateFileDto });
    }
  }

  async delete(id: File['id']): Promise<void> {
    const file = await this.repository.findOne(id);
    if (file) {
      this.deleteS3File(file);
      await this.repository.remove(file);
    }
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

  async deleteS3File(file: File): Promise<void> {
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

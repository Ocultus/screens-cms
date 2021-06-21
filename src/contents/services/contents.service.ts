import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentRepository } from '../contents.repository';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private readonly contentRepository: ContentRepository,
  ) {}
}

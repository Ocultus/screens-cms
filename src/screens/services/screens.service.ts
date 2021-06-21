import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreenRepository } from '../screens.repository';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(ScreenRepository)
    private readonly screenRepository: ScreenRepository,
  ) {}
}

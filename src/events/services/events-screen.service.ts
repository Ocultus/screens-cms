import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateScreenDto,
  ResponseScreenDto,
  ResponseScreensDto,
} from 'src/screens/screens.dto';
import { ScreenRepository } from 'src/screens/screens.repository';
import { User } from 'src/users/user.entity';
import { Event } from '../event.entity';

export class EventScreenService {
  constructor(private readonly screenRepository: ScreenRepository) {}

  async getScreens(eventId: Event['id']): Promise<ResponseScreensDto> {
    const foundScreens: ResponseScreenDto[] = await this.screenRepository.find({
      where: { eventId },
    });
    return { screens: foundScreens };
  }

  async createScreen(
    createScreenDto: CreateScreenDto,
    eventId: Event['id'],
    userId: User['id'],
  ): Promise<ResponseScreenDto> {
    return await this.screenRepository.save({
      ...createScreenDto,
      eventId,
      userId,
    });
  }
}

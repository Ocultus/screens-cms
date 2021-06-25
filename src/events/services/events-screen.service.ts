import { InjectRepository } from '@nestjs/typeorm';
import { ResponseScreenDto, ResponseScreensDto } from 'src/screens/screens.dto';
import { ScreenRepository } from 'src/screens/screens.repository';
import { Event } from '../event.entity';

export class EventScreenService {
  constructor(
    @InjectRepository(ScreenRepository)
    private readonly screenRepository: ScreenRepository,
  ) {}

  async getScreens(eventId: Event['id']): Promise<ResponseScreensDto> {
    const foundScreens: ResponseScreenDto[] = await this.screenRepository.find({
      where: { eventId },
    });
    return { screens: foundScreens };
  }
}

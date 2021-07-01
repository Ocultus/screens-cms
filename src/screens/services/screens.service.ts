import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ScreenRepository } from '../screens.repository';
import { Screen } from '../screen.entity';
import { CrudRequest, Override } from '@nestjsx/crud';
import { EventRepository } from 'src/events/events.repository';
import { UpdateScreenDto } from '../screens.dto';

@Injectable()
export class ScreenService extends TypeOrmCrudService<Screen> {
  constructor(
    readonly repository: ScreenRepository,
    private readonly eventRepository: EventRepository,
  ) {
    super(repository);
  }

  @Override()
  async updateOne(req: CrudRequest, dto: UpdateScreenDto) {
    if (dto.eventId) {
      const event = await this.eventRepository.findOne(dto.eventId);
      if (!event) {
        throw new NotFoundException('Event don`t exists');
      }
    }
    return await super.updateOne(req, dto);
  }
}

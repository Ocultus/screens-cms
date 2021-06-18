import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './events.repository';
import { EventService } from './services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository])],
  providers: [EventService],
})
export class EventModule {}

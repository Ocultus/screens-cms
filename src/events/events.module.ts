import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenRepository } from 'src/screens/screens.repository';
import { EventScreenController } from './controllers/event-screens.controller';
import { EventContoller } from './controllers/events.contoller';
import { EventRepository } from './events.repository';
import { EventScreenService } from './services/events-screens.service';
import { EventService } from './services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository, ScreenRepository])],
  providers: [EventService, EventScreenService],
  controllers: [EventContoller, EventScreenController],
})
export class EventModule {}

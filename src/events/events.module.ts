import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenRepository } from 'src/screens/screens.repository';
import { EventScreenController } from './controllers/events-screen.controller';
import { EventContoller } from './controllers/events.controller';
import { EventRepository } from './events.repository';
import { EventScreenService } from './services/events-screen.service';
import { EventService } from './services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository, ScreenRepository])],
  providers: [EventService, EventScreenService],
  controllers: [EventContoller, EventScreenController],
  exports: [EventService],
})
export class EventModule {}

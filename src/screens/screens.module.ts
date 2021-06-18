import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenRepository } from './screens.repository';
import { ScreenService } from './services/screens.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenRepository])],
  providers: [ScreenService],
})
export class ScreenModule {}

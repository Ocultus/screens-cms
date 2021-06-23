import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Event } from './event.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ResponseScreensDto } from 'src/screens/screens.dto';
import { EventScreenService } from './services/events-screen.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('events')
@Controller('events')
export class EventScreenController {
  constructor(private readonly eventScreenService: EventScreenService) {}

  @Get(':id/screens')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get screens by event id' })
  @ApiOkResponse({
    description: 'The screens have been successfully found',
    type: ResponseScreensDto,
  })
  async getScreens(
    @Param('id') eventId: Event['id'],
  ): Promise<ResponseScreensDto> {
    return this.eventScreenService.getScreens(eventId);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Event } from '../event.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  CreateScreenDto,
  ResponseScreenDto,
  ResponseScreensDto,
} from 'src/screens/screens.dto';
import { EventScreenService } from '../services/events-screen.service';
import { User } from 'src/users/users.decorator';
import { CheckEventExistsInterceptor } from '../events-exists.interceptor';

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

  @UseInterceptors(CheckEventExistsInterceptor)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Create a single screen' })
  @ApiOkResponse({
    description: 'The screens have been successfully found',
    type: ResponseScreenDto,
  })
  @Post(':id/screen')
  async createScreen(
    @User('id') userId: string,
    @Body() createScreenDto: CreateScreenDto,
    @Param('id') eventId: Event['id'],
  ) {
    return this.eventScreenService.createScreen(
      createScreenDto,
      eventId,
      userId,
    );
  }
}

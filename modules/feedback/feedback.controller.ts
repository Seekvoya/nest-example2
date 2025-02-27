import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FeedbackService } from '@/modules/feedback/feedback.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/decorators/is-public';
import { ApiDocumentation } from '@/decorators/documentation.decorator';
import {
  CreateFeedbackDto,
  FeedbackQueryDto,
  UpdateFeedbackDto,
} from '@/modules/feedback/dto/feedback.in.dto';
import { OutputFeedbackDto, ShortOutFeedbackDto } from '@/modules/feedback/dto/feedback.out.dto';
import { Admin } from '@/auth/decorators/is-admin';
import { plainToInstance } from 'class-transformer';
import { ApiResponseMessageDto } from '@/common/dto/response.out.dto';
import { ApiSuccessResponse } from '@/utils/ApiSuccessResponse';

@Controller('feedback')
@ApiTags('Обратная связь')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Public()
  @Get()
  @ApiDocumentation({
    type: ShortOutFeedbackDto,
    summary: 'Получение обратных связей',
  })
  async getFeedbacks(@Query() query: FeedbackQueryDto) {
    const feedbacks = await this.feedbackService.findAll(query);
    return plainToInstance(ShortOutFeedbackDto, feedbacks);
  }

  @Admin()
  @Post()
  @ApiDocumentation({
    type: OutputFeedbackDto,
    summary: 'Создание ос',
  })
  async createFeedback(@Body() data: CreateFeedbackDto) {
    const feedback = await this.feedbackService.create(data);
    return plainToInstance(OutputFeedbackDto, feedback);
  }

  @Admin()
  @Patch(':id')
  @ApiDocumentation({
    type: OutputFeedbackDto,
    summary: 'Обновление ос',
  })
  async patchFeedback(@Param('id') id: string, @Body() data: UpdateFeedbackDto) {
    const feedback = await this.feedbackService.update(id, data);
    return plainToInstance(OutputFeedbackDto, feedback);
  }

  @Admin()
  @Delete(':id')
  @ApiDocumentation({
    type: ApiResponseMessageDto,
    summary: 'Удаление ос',
  })
  async removeFeedback(@Param('id') id: string) {
    await this.feedbackService.remove(id);
    return ApiSuccessResponse('Deleted successfully');
  }
}

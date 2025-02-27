import { EntitiesExceptions } from '@/exceptions/app';
import {
  CreateFeedbackDto,
  FeedbackQueryDto,
  UpdateFeedbackDto,
} from '@/modules/feedback/dto/feedback.in.dto';
import { FeedbackEntity } from '@/modules/feedback/entities/feedback.entity';
import { UsersService } from '@/modules/users/users.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { callDbMethodOrError } from '@/utils/dbMethodCaller';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  async findByIdOrError(id: string) {
    const entity = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }

    return entity;
  }

  async findAll({ id, date }: FeedbackQueryDto): Promise<FeedbackEntity[]> {
    const where: FindOptionsWhere<FeedbackEntity> = {};

    if (date) where.date = date;
    if (id) where.user = { id: id };

    const feedbacks = await this.feedbackRepository.find({
      where,
      relations: { user: true, feedbacker: true },
    });

    return feedbacks;
  }

  async create(data: CreateFeedbackDto) {
    const user = await this.userService.findOneByOrError({ id: data.userId });
    const feedbacker = await this.userService.findOneByOrError({ id: data.feedbackerId });

    const newFeedback = this.feedbackRepository.create({
      ...data,
      user,
      feedbacker,
    });

    return newFeedback.save();
  }

  async update(id: string, data: UpdateFeedbackDto) {
    const feedback = await this.findByIdOrError(id);

    const updated = this.feedbackRepository.merge(feedback, data);

    return updated.save();
  }

  async remove(id: string) {
    await callDbMethodOrError(this.feedbackRepository.delete(id), EntitiesExceptions.NotFound);
  }
}

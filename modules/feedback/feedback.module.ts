import { Module } from '@nestjs/common';
import { FeedbackService } from '@/modules/feedback/feedback.service';
import { FeedbackController } from '@/modules/feedback/feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from '@/modules/feedback/entities/feedback.entity';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  providers: [FeedbackService],
  controllers: [FeedbackController],
  imports: [TypeOrmModule.forFeature([FeedbackEntity]), UsersModule],
})
export class FeedbackModule {}

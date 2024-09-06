import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './entities/feedback.entity';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema}])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}

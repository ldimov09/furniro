import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(@InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const newFeedback = new this.feedbackModel(createFeedbackDto);
    return newFeedback.save();
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = new this.reviewModel(createReviewDto);
    return newReview.save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findOne(id: string): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewModel.findByIdAndUpdate(id, updateReviewDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Review> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByItemId(itemId: string): Promise<Review[]> {
    return this.reviewModel.find({ itemId }).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
  ) {}

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const newSubscription = new this.subscriptionModel(createSubscriptionDto);
    return newSubscription.save();
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionModel.find().exec();
  }

  async getSubscriptionByEmail(email: string): Promise<Subscription> {
    return this.subscriptionModel.findOne({ email }).exec();
  }

  async deleteSubscriptionByEmail(email: string): Promise<Subscription> {
    return this.subscriptionModel.findOneAndDelete({ email }).exec();
  }
}

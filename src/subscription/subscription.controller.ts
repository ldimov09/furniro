import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionsService: SubscriptionService) {}

  @Post()
  async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.createSubscription(createSubscriptionDto);
  }

  @Get()
  async getAllSubscriptions() {
    return this.subscriptionsService.getAllSubscriptions();
  }

  @Get(':email')
  async getSubscriptionByEmail(@Param('email') email: string) {
    return this.subscriptionsService.getSubscriptionByEmail(email);
  }

  @Delete(':email')
  async deleteSubscriptionByEmail(@Param('email') email: string) {
    return this.subscriptionsService.deleteSubscriptionByEmail(email);
  }
}

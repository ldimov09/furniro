import { MaxFileSizeValidator, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/items/entities/item.entity';
import Stripe from 'stripe';
import { MailService } from 'src/mail/mailer.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
    { name: Item.name, schema: ItemSchema },
  ])],
  controllers: [OrderController],
  providers: [OrderService, Stripe, MailService],
})
export class OrderModule {}

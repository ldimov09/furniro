import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/items/entities/item.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
    { name: Item.name, schema: ItemSchema }
  ])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

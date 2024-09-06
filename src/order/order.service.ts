import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { Item } from '../items/entities/item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderItems = [];

    // Loop through each item in the order to check stock and gather price and discount info
    for (const orderItem of createOrderDto.items) {
      const item = await this.itemModel.findById(orderItem.itemId).exec();

      if (!item) {
        throw new BadRequestException(`Item with id ${orderItem.itemId} not found.`);
      }

      // Check if there's enough stock
      if (item.quantity < orderItem.quantity) {
        throw new BadRequestException(
          `Not enough stock for item ${item.name}. Available: ${item.quantity}, Requested: ${orderItem.quantity}`
        );
      }

      // Decrease item quantity
      item.quantity -= orderItem.quantity;
      await item.save();

      // Add item data with price and discount to the order items
      orderItems.push({
        itemId: orderItem.itemId,
        quantity: orderItem.quantity,
        size: orderItem.size,
        color: orderItem.color,
        price: item.price,
        discount: item.discount || 0
      });
    }

    // Create the order with the updated item information
    const newOrder = new this.orderModel({
      ...createOrderDto,
      items: orderItems
    });
    return newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('items.itemId').exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate('items.itemId').exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}

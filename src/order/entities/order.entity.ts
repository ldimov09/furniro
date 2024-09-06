import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Item } from '../../items/entities/item.entity';

@Schema()
export class Order extends Document<string> {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  companyName?: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  paymentType: string;

  @Prop()
  additionalInformation?: string;

  // Array of items with quantity
  @Prop([{
    itemId: { type: String, ref: Item.name, required: true },
    quantity: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 }
  }])
  items: { itemId: string; quantity: number; color: string; size: string; price: number; discount: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

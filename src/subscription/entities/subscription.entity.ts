import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscription extends Document {
  @Prop({ required: true, unique: true })
  email: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

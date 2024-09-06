import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Item', required: true })
  itemId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  value: number;

  @Prop({ required: false, minlength: 2, maxlength: 256 })
  comment?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

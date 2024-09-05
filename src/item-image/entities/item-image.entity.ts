import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ItemImage extends Document {
  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  content: string; // Base64 string
}

export const ItemImageSchema = SchemaFactory.createForClass(ItemImage);

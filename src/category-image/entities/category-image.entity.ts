import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class CategoryImage extends Document<string> {
  @Prop({ type: String, ref: 'Category', required: true })
  categoryId: string;

  @Prop({ required: true })
  content: string;  // Base64 string
}

export const CategoryImageSchema = SchemaFactory.createForClass(CategoryImage);

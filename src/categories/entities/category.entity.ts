import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document<string> {
  @Prop({ required: true })
  name: string;

  image?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);


import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Feedback extends Document<string> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);

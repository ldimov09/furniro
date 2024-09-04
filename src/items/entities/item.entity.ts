import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Item extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    shortDescription: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ min: 0, max: 100 })
    discount: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ default: false })
    markAsNew: boolean;

    @Prop()
    coverPhoto: string;

    @Prop()
    sizes: string;

    @Prop()
    colors: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

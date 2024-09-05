import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Item extends Document<string> {
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

    @Prop({ type: Types.ObjectId, ref: 'ItemImage' })
    images?: Types.ObjectId[] | any;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

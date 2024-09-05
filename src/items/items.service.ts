import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) { }

    async create(createItemDto: any): Promise<Item> {
        const newItem = new this.itemModel(createItemDto);
        return newItem.save();
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().populate("category", "name").exec();
    }

    async findOne(id: string): Promise<Item> {
        return this.itemModel.findById(id).populate("category", "name").exec();
    }

    async update(id: string, updateItemDto: any): Promise<Item> {
        return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Item> {
        return this.itemModel.findByIdAndDelete(id).exec();
    }
}

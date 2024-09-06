import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemImage } from './entities/item-image.entity';
import { CreateItemImageDto } from './dto/create-item-image.dto';

@Injectable()
export class ItemImageService {
  constructor(@InjectModel(ItemImage.name) private readonly itemImageModel: Model<ItemImage>) {}

  async create(createItemImageDto: CreateItemImageDto): Promise<ItemImage> {
    const newItemImage = new this.itemImageModel(createItemImageDto);
    return newItemImage.save();
  }

  async findByItemId(itemId: string): Promise<ItemImage[]> {
    return this.itemImageModel.find({ itemId: itemId }).exec();
  }

  async remove(id: string): Promise<ItemImage> {
    return this.itemImageModel.findByIdAndDelete(id).exec();
  }

  async deleteByItemId(itemId: string): Promise<void> {
    await this.itemImageModel.deleteMany({ itemId }).exec();
  }
}

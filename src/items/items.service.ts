import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Item } from './entities/item.entity';
import { ItemImageService } from 'src/item-image/item-image.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
    private readonly itemImageService: ItemImageService,
  ) { }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    return newItem.save();
  }

  async findAll(options: {
    field?: string;
    order?: string;
    filterField?: string;
    value?: string;
    itemsPerPage?: number;
    page?: number;
  }): Promise<Item[]> {
    const { field, order, filterField, value, itemsPerPage, page } = options;

    const filter = {};
    if (filterField && value) {
      filter[filterField] = new RegExp(value, 'i');
    }

    const sortField = field || 'name';
    const sortOrder = order === 'desc' ? -1 : 1;

    if (sortField === 'price' || filterField === 'price') {
      const items = await this.itemModel.aggregate([
        {
          $project: {
            name: 1,
            priceWithDiscount: {
              $subtract: ['$price', { $multiply: ['$price', { $divide: ['$discount', 100] }] }],
            },
            quantity: 1,
            category: 1,
            coverPhoto: 1,
            description: 1,
          },
        },
        { $match: filter },
        { $sort: { priceWithDiscount: sortOrder } },
        { $skip: (page - 1) * itemsPerPage },
        { $limit: itemsPerPage },
      ]);

      return items;
    }

    const items = await this.itemModel
      .find(filter)
      .populate('category', 'name')
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    for (const item of items) {
      item['images'] = await this.itemImageService.findByItemId(item._id);
    }

    return items;
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).populate("category", "name").exec();
    item['images'] = await this.itemImageService.findByItemId(item._id);
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Item> {
    // Find the item first
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // Delete all images associated with the item
    await this.itemImageService.deleteByItemId(id);

    // Now delete the item itself
    return this.itemModel.findByIdAndDelete(id).exec();
  }

  async getByCategory(categoryId: string): Promise<Item[]> {
    return this.itemModel.find({ category: categoryId }).populate("category", "name").exec();
  }
}


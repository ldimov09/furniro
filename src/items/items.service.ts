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

    async findAll(options: {
        field?: string;
        order?: string;
        filterField?: string;
        value?: string;
        itemsPerPage?: number;
        page?: number;
      }): Promise<Item[]> {
        const { field, order, filterField, value, itemsPerPage, page } = options;

        const filter: any = {};
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

        return this.itemModel
          .find(filter)
          .populate('category', 'name')
          .sort({ [sortField]: sortOrder })
          .skip((page - 1) * itemsPerPage)
          .limit(itemsPerPage)
          .exec();
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

    async getByCategory(categoryId: string): Promise<Item[]> {
        return this.itemModel.find({ category: categoryId }).populate("category", "name").exec();
    }
}


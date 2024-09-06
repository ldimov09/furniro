import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Item } from 'src/items/entities/item.entity';
import { CategoryImageService } from 'src/category-image/category-image.service';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Item.name) private itemModel: Model<Item>,
        private readonly categoryImageService: CategoryImageService
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const newCategory = new this.categoryModel(createCategoryDto);
        return newCategory.save();
    }

    async findAll(): Promise<{ content: {}; categories: Category[]}> {
        const categories = await this.categoryModel.find().exec();
    	const content = {}
        for (const category of categories) {
            content[category._id]  = (await this.categoryImageService.findByCategoryId(category._id)).content;
        }
        return {content, categories};
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const existingCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
        if (!existingCategory) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return existingCategory;
    }

    async remove(id: string): Promise<void> {
        const itemsInCategory = await this.itemModel.find({ category: id }).exec();
        
        if (itemsInCategory.length > 0) {
            throw new BadRequestException('Cannot delete category with items');
        }

        const result = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}

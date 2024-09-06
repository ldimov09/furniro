import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryImage } from './entities/category-image.entity';
import { CreateCategoryImageDto } from './dto/create-category-image.dto';
import { UpdateCategoryImageDto } from './dto/update-category-image.dto';

@Injectable()
export class CategoryImageService {
  constructor(
    @InjectModel(CategoryImage.name) private readonly categoryImageModel: Model<CategoryImage>
  ) {}

  async create(createCategoryImageDto: CreateCategoryImageDto): Promise<CategoryImage> {
    const newCategoryImage = new this.categoryImageModel(createCategoryImageDto);
    return newCategoryImage.save();
  }

  async update(categoryId: string, updateCategoryImageDto: UpdateCategoryImageDto): Promise<CategoryImage> {
    return this.categoryImageModel.findOneAndUpdate(
      { categoryId }, 
      updateCategoryImageDto, 
      { new: true, upsert: true }
    ).exec();
  } 

  async remove(categoryId: string): Promise<CategoryImage> {
    return this.categoryImageModel.findOneAndDelete({ categoryId }).exec();
  }

  async findByCategoryId(categoryId: string): Promise<CategoryImage> {
    return this.categoryImageModel.findOne({ categoryId }).exec();
  }
}

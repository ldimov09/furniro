import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { Item, ItemSchema } from 'src/items/entities/item.entity';
import { CategoryImageService } from 'src/category-image/category-image.service';
import { CategoryImage, CategoryImageSchema } from 'src/category-image/entities/category-image.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }, { name: Category.name, schema: CategorySchema },  { name: CategoryImage.name, schema: CategoryImageSchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryImageService],
})
export class CategoriesModule {}

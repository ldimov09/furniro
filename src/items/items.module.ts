import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item, ItemSchema } from './entities/item.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/categories/entities/category.entity';
import { ItemImage, ItemImageSchema } from 'src/item-image/entities/item-image.entity';
import { ItemImageService } from '../item-image/item-image.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Item.name, schema: ItemSchema },
            { name: Category.name, schema: CategorySchema },
            { name: ItemImage.name, schema: ItemImageSchema }
        ])],
    controllers: [ItemsController],
    providers: [ItemsService, ItemImageService],
})
export class ItemsModule { }

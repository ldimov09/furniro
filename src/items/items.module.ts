import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item, ItemSchema } from './entities/item.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/categories/entities/category.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }, { name: Category.name, schema: CategorySchema }])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}

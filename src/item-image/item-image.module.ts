import { Module } from '@nestjs/common';
import { ItemImageService } from './item-image.service';
import { ItemImageController } from './item-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemImage, ItemImageSchema } from './entities/item-image.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ItemImage.name, schema: ItemImageSchema }])],
  controllers: [ItemImageController],
  providers: [ItemImageService],
})
export class ItemImageModule {}

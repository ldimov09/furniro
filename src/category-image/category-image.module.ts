import { Module } from '@nestjs/common';
import { CategoryImageService } from './category-image.service';
import { CategoryImageController } from './category-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryImage, CategoryImageSchema } from './entities/category-image.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: CategoryImage.name, schema: CategoryImageSchema }])],
  controllers: [CategoryImageController],
  providers: [CategoryImageService],
})
export class CategoryImageModule {}

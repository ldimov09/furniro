import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ItemImageService } from './item-image.service';
import { CreateItemImageDto } from './dto/create-item-image.dto';
import { ValidateMongoIdPipe } from 'src/validate-mongo-id/validate-mongo-id.pipe';

@Controller('item-images')
export class ItemImageController {
  constructor(private readonly itemImageService: ItemImageService) {}

  @Post()
  async create(@Body() createItemImageDto: CreateItemImageDto) {
    return this.itemImageService.create(createItemImageDto);
  }

  @Delete(':id')
  async remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.itemImageService.remove(id);
  }
}

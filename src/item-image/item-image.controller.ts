import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ItemImageService } from './item-image.service';
import { CreateItemImageDto } from './dto/create-item-image.dto';

@Controller('item-images')
export class ItemImageController {
  constructor(private readonly itemImageService: ItemImageService) {}

  @Post()
  async create(@Body() createItemImageDto: CreateItemImageDto) {
    return this.itemImageService.create(createItemImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemImageService.remove(id);
  }
}

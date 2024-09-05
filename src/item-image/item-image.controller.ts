import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ItemImageService } from './item-image.service';

@Controller('item-images')
export class ItemImageController {
  constructor(private readonly itemImageService: ItemImageService) {}

  @Post()
  async create(@Body() createItemImageDto: any) {
    return this.itemImageService.create(createItemImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemImageService.remove(id);
  }
}

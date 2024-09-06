import { Controller, Post, Body, Put, Param, Delete, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoriesService } from './categories.service';
import { CategoryImageService } from '../category-image/category-image.service';
import { CreateCategoryImageDto } from '../category-image/dto/create-category-image.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly categoryImageService: CategoryImageService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createCategoryDto: any, 
    @UploadedFile() file: Express.Multer.File
  ) {
    const newCategory = await this.categoryService.create(createCategoryDto);

    if (file) {
      const base64Image = file.buffer.toString('base64');
      const createCategoryImageDto: CreateCategoryImageDto = {
        categoryId: newCategory._id,
        content: base64Image
      };
      await this.categoryImageService.create(createCategoryImageDto);
    }

    return newCategory;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string, 
    @Body() updateCategoryDto: any, 
    @UploadedFile() file: Express.Multer.File
  ) {
    const updatedCategory = await this.categoryService.update(id, updateCategoryDto);

    if (file) {
      const base64Image = file.buffer.toString('base64');
      const updateCategoryImageDto = { content: base64Image };
      await this.categoryImageService.update(id, updateCategoryImageDto);
    }

    return updatedCategory;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryImageService.remove(id);
    return this.categoryService.remove(id);
  }
}

import { Controller, Post, Body, Put, Param, Delete, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoriesService } from './categories.service';
import { CategoryImageService } from '../category-image/category-image.service';
import { CreateCategoryImageDto } from '../category-image/dto/create-category-image.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ValidateMongoIdPipe } from 'src/validate-mongo-id/validate-mongo-id.pipe';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly categoryImageService: CategoryImageService
  ) {}

  @Get()
  async getAll(): Promise<{ content: {}; categories: Category[]}> {
    return await this.categoryService.findAll();
  }

  @Get(":id")
  async getOne(@Param('id', ValidateMongoIdPipe) id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createCategoryDto: CreateCategoryDto, 
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
    @Param('id', ValidateMongoIdPipe) id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto, 
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
  async remove(@Param('id', ValidateMongoIdPipe) id: string) {
    await this.categoryImageService.remove(id);
    return this.categoryService.remove(id);
  }
}

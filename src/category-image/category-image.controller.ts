import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryImageService } from './category-image.service';
import { CreateCategoryImageDto } from './dto/create-category-image.dto';
import { UpdateCategoryImageDto } from './dto/update-category-image.dto';

@Controller('category-image')
export class CategoryImageController {
   
}

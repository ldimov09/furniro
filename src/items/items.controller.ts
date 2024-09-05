import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Patch, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ValidateMongoIdPipe } from 'src/validate-mongo-id/validate-mongo-id.pipe';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('coverPhoto', {
        storage: diskStorage({
            destination: './uploads', // Directory where files will be saved
            filename: (req, file, callback) => {
                const filename = `${Date.now()}${extname(file.originalname)}`;
                callback(null, filename);
            },
        }),
    }))
    async create(@Body() createItemDto: CreateItemDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            createItemDto.coverPhoto = file.filename;
        }
        return this.itemService.create(createItemDto);
    }

    @Get()
    async findAll(
        @Query('field') field: string, // Sorting field
        @Query('order') order: string, // Sorting order
        @Query('filterField') filterField: string, // Field to filter by
        @Query('value') value: string, // Filter value
        @Query('items') itemsPerPage = 10, // Number of items per page, default 10
        @Query('page') page = 1, // Page number, default 1
    ) {
        return this.itemService.findAll({
            field,
            order,
            filterField,
            value,
            itemsPerPage: +itemsPerPage,
            page: +page,
        });
    }

    @Get(':id')
    async findOne(@Param('id', ValidateMongoIdPipe) id: string): Promise<Item> {
        return this.itemService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('coverPhoto', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const filename = `${Date.now()}${extname(file.originalname)}`;
                callback(null, filename);
            },
        }),
    }))
    async update(@Param('id', ValidateMongoIdPipe) id: string, @Body() updateItemDto: UpdateItemDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            updateItemDto.coverPhoto = file.filename;
        }
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    async remove(@Param('id', ValidateMongoIdPipe) id: string): Promise<Item> {
        return this.itemService.remove(id);
    }

    @Get('category/:id')
    async getByCategory(@Param('id', ValidateMongoIdPipe) id: string): Promise<Item[]> {
        return this.itemService.getByCategory(id);
    }
}

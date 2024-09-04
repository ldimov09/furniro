import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

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
    async findAll(): Promise<Item[]> {
        return this.itemService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Item> {
        return this.itemService.findOne(id);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('coverPhoto', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const filename = `${Date.now()}${extname(file.originalname)}`;
                callback(null, filename);
            },
        }),
    }))
    async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            updateItemDto.coverPhoto = file.filename;
        }
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Item> {
        return this.itemService.remove(id);
    }
}

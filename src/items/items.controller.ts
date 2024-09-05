import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, Patch, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ValidateMongoIdPipe } from 'src/validate-mongo-id/validate-mongo-id.pipe';
import { ItemImageService } from 'src/item-image/item-image.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService, private readonly itemImageService: ItemImageService) { }

    @Post()
    @UseInterceptors(FilesInterceptor('files', 10))
    async create(@Body() createItemDto: CreateItemDto, @UploadedFiles() files: Express.Multer.File[]) {
        const newItem = await this.itemService.create(createItemDto);
        if (files && files.length > 0) {
            for (const file of files) {
                const base64Content = file.buffer.toString('base64'); // Convert each file to base64
                await this.itemImageService.create({
                    itemId: newItem._id,
                    content: base64Content,
                });
            }
        }

        return newItem;
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
    @UseInterceptors(FilesInterceptor('files', 10)) // Handle file upload for updating
    async update(
        @Param('id') id: string,
        @Body() updateItemDto: UpdateItemDto,
        @UploadedFile() files: Express.Multer.File[],
    ) {
        // Update the item
        const updatedItem = await this.itemService.update(id, updateItemDto);
        await this.itemImageService.deleteByItemId(updatedItem._id);
        // If a file was uploaded, convert it to base64 and save the image
        if (files && files.length > 0) {
            for (const file of files) {
                const base64Content = file.buffer.toString('base64'); // Convert each file to base64
                await this.itemImageService.create({
                    itemId: updatedItem._id,
                    content: base64Content,
                });
            }
        }


        return updatedItem;
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

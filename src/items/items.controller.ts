import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, Patch, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ValidateMongoIdPipe } from 'src/validate-mongo-id/validate-mongo-id.pipe';
import { ItemImageService } from 'src/item-image/item-image.service';

@Controller('items')
export class ItemsController {
    constructor(
        private readonly itemService: ItemsService, 
        private readonly itemImageService: ItemImageService,
    ) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'coverPhoto', maxCount: 1 },
        { name: 'files', maxCount: 10 }
    ]))
    async create(@Body() createItemDto: CreateItemDto, @UploadedFiles() files: { files?: Express.Multer.File[], coverPhoto?: Express.Multer.File[] }) {
        const newItem = await this.itemService.create(createItemDto);

        if(files && files.coverPhoto![0]){
            const base64Content = files.coverPhoto[0].buffer.toString('base64'); // Convert each file to base64
            await this.itemImageService.create({
                itemId: newItem._id,
                type: "cover",
                content: base64Content,
            });
        }
        if (files && files.files && files.files.length > 0) {
            for (const file of files.files) {
                const base64Content = file.buffer.toString('base64'); // Convert each file to base64
                await this.itemImageService.create({
                    itemId: newItem._id,
                    type: "additional",
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
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'coverPhoto', maxCount: 1 },
        { name: 'files', maxCount: 10 }
    ]))
    async update(
        @Param('id') id: string,
        @Body() updateItemDto: UpdateItemDto,
        @UploadedFiles() files: { files?: Express.Multer.File[], coverPhoto?: Express.Multer.File[] }
    ) {
        // Update the item
        const updatedItem = await this.itemService.update(id, updateItemDto);
        if((files && files.coverPhoto![0]) || (files && files.files && files.files.length > 0)){
            await this.itemImageService.deleteByItemId(updatedItem._id);
        }

        if(files && files.coverPhoto![0]){
            const base64Content = files.coverPhoto[0].buffer.toString('base64'); // Convert each file to base64
            await this.itemImageService.create({
                itemId: updatedItem._id,
                type: "cover",
                content: base64Content,
            })
        }

        if (files && files.files && files.files.length > 0) {
            for (const file of files.files) {
                const base64Content = file.buffer.toString('base64'); // Convert each file to base64
                await this.itemImageService.create({
                    itemId: updatedItem._id,
                    type: "additional",
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

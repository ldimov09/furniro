import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ValidateMongoIdPipe } from 'src/validate-mongo-id/validate-mongo-id.pipe';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.reviewService.findOne(id);
  }

  @Get('item/:itemId')
  async findByItemId(@Param('itemId') itemId: string) {
    return this.reviewService.findByItemId(itemId);
  }

  @Put(':id')
  async update(@Param('id', ValidateMongoIdPipe) id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.reviewService.remove(id);
  }
}

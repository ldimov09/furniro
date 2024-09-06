import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import config from './config/keys';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ItemImageModule } from './item-image/item-image.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ReviewModule } from './review/review.module';
import { CategoryImageModule } from './category-image/category-image.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI), ItemsModule,
    CategoriesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your uploads directory
      serveRoot: '/uploads', // The route prefix to access the files
    }),
    ItemImageModule,
    FeedbackModule,
    ReviewModule,
    CategoryImageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule {}

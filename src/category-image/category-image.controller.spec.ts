import { Test, TestingModule } from '@nestjs/testing';
import { CategoryImageController } from './category-image.controller';
import { CategoryImageService } from './category-image.service';

describe('CategoryImageController', () => {
  let controller: CategoryImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryImageController],
      providers: [CategoryImageService],
    }).compile();

    controller = module.get<CategoryImageController>(CategoryImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CategoryImageService } from './category-image.service';

describe('CategoryImageService', () => {
  let service: CategoryImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryImageService],
    }).compile();

    service = module.get<CategoryImageService>(CategoryImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

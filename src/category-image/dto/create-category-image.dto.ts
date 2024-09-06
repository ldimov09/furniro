import { IsMongoId, IsString } from 'class-validator';

export class CreateCategoryImageDto {
  @IsMongoId()
  categoryId: string;

  @IsString()
  content: string;  // Base64 string
}

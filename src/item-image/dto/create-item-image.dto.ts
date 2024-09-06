import { IsMongoId, IsString } from 'class-validator';

export class CreateItemImageDto {
  @IsMongoId()
  itemId: string;

  @IsString()
  type: string;

  @IsString()
  content: string;  // Base64 string
}

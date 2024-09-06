import { IsInt, IsOptional, IsString, Min, Max, Length, IsMongoId } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  itemId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  value: number;

  @IsOptional()
  @IsString()
  @Length(2, 256)
  comment?: string;
}

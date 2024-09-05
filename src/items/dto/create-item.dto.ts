import { IsString, IsNumber, IsBoolean, IsOptional, Min, Max, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseFloat(value))
  discount: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  markAsNew?: boolean;

  @IsOptional()
  @IsString()
  coverPhoto?: string;

  @IsOptional()
  @IsString()
  sizes?: string;

  @IsOptional()
  @IsString()
  colors?: string;

  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  files?: string[];
}

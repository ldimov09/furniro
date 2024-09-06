import { IsString, IsNotEmpty, IsOptional, IsEmail, IsArray, IsMongoId, IsNumber, ArrayNotEmpty, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['cod', 'card'])
  paymentType: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  additionalInformation?: string;

  @IsArray()
  @ArrayNotEmpty()
  items: { itemId: string; quantity: number, color: string, size: string }[];
}

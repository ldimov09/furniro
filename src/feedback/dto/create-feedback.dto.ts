import { IsString, IsEmail, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 1000)
  message: string;
}

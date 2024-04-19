import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
export class AdminDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'mobileno must be 10 numders only' })
  @MaxLength(10, { message: 'mobileno must be 10 numders only' })
  mobileno: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

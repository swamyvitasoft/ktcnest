import { IsNotEmpty, IsString } from 'class-validator';
export class AdminDto {
  @IsNotEmpty()
  @IsString()
  mobileno: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

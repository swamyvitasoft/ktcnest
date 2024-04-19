import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class ProductDto {
  @IsNotEmpty()
  @IsString()
  productname: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}

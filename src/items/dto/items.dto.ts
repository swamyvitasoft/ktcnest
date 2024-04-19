import { IsNotEmpty, IsString } from 'class-validator';

export class ItemsDto {
  @IsNotEmpty()
  @IsString()
  itemname: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

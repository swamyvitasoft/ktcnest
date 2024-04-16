import { IsNotEmpty, IsString, IsNumber, IsMongoId } from 'class-validator';

export class ItemsDto {
    @IsNotEmpty()
    @IsString()
    itemname: string;
   
    @IsNotEmpty()
    @IsString()
    status: string;
    
}
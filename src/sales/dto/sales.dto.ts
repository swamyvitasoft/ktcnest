import { IsNotEmpty, IsString, IsNumber, IsMongoId } from 'class-validator';

export class SalesDto {
    @IsNotEmpty()
  @IsNumber()
  sno: number;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  mobileno: string;

  @IsNotEmpty()
  @IsString()
  particulars: string;

  @IsNotEmpty()
  @IsMongoId()
  itemId: string; // As itemId is of type mongoose.Schema.Types.ObjectId in your schema, it's a string in TypeScript

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsString()
  imei: string;

  @IsNotEmpty()
  @IsNumber()
  estimatedamount: number;

  @IsNotEmpty()
  @IsNumber()
  advanceamount: number;

  @IsNotEmpty()
  @IsNumber()
  balaceamount: number;

  @IsNotEmpty()
  @IsString()
  status: string;

}
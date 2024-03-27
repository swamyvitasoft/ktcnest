import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalesDto } from './dto/sales.dto'; 
import { Sales } from './schema/sales.schema';

@Injectable()
export class SalesService {

    constructor(@InjectModel('Sales') private salesModel: Model<Sales>) {} 

    async create(salesDto: SalesDto): Promise<Sales> {
        const createdSale = new this.salesModel(salesDto);
        return createdSale.save();
      }

      async findAll(): Promise<Sales[]> {
        return this.salesModel.find().exec();
      }
    
      async findOne(id: string): Promise<Sales> {
        return this.salesModel.findById(id).exec();
      }
      
      async update(id: string, salesDto: SalesDto): Promise<Sales> {
        return this.salesModel.findByIdAndUpdate(id, salesDto, { new: true }).exec();
      }
    
      async remove(id: string,): Promise<void> {
        await this.salesModel.findByIdAndDelete(id).exec();
      }
}

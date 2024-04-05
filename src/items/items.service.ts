import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemsDto } from '../items/dto/items.dto'; 
import { Items } from '../items/schema/items.schema';

@Injectable()
export class ItemsService {

    constructor(@InjectModel('Items') private itemsModel: Model<Items>) {} 

    async create(itemsDto: ItemsDto): Promise<Items> {
        const createdItems = new this.itemsModel(itemsDto);
        return createdItems.save();
      }

      async findAll(): Promise<Items[]> {
        return this.itemsModel.find().exec();
      }
    
      async findOne(id: string): Promise<Items> {
        return this.itemsModel.findById(id).exec();
      }
      
      async update(id: string, itemsDto: ItemsDto): Promise<Items> {
        return this.itemsModel.findByIdAndUpdate(id, itemsDto, { new: true }).exec();
      }
    
      async remove(id: string,): Promise<void> {
        await this.itemsModel.findByIdAndDelete(id).exec();
      }
}

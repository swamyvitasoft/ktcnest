import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(productdto: ProductDto): Promise<Product> {
    const newProduct = new this.productModel(productdto);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, productdto: ProductDto): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, productdto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Product> {
    const deletedProuduct = await this.productModel
      .findByIdAndDelete(id)
      .exec();
    return deletedProuduct;
  }
}

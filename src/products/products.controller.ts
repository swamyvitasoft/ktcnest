import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import { verifyToken } from '../jwt/verifyToken';
import { Product } from './schema/product.schema';
@Controller('products')
export class ProductsController {
  constructor(private readonly productservice: ProductsService) {}

  @Post()
  @UseGuards(verifyToken)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}${path.extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file,
    @Body() productdto: ProductDto,
  ): Promise<Product> {
    try {
      const imageUrl = file.filename;
      return await this.productservice.create({
        ...productdto,
        image: imageUrl,
      });
    } catch (error) {
      throw new InternalServerErrorException('Product creation failed');
    }
  }

  @Get()
  @UseGuards(verifyToken)
  async findAll(): Promise<Product[]> {
    try {
      return await this.productservice.findAll();
    } catch (error) {
      throw new InternalServerErrorException('products not found.');
    }
  }

  @Get(':id')
  @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<Product> {
    try {
      const Product = await this.productservice.findOne(id);
      if (!Product) {
        throw new NotFoundException('Product not found.');
      }
      return Product;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not fetch Product.');
    }
  }

  @Put(':id')
  @UseGuards(verifyToken)
  async update(
    @Param('id') id: string,
    @Body() productdto: ProductDto,
  ): Promise<Product> {
    try {
      const updateProduct = await this.productservice.update(id, productdto);
      if (!updateProduct) {
        throw new NotFoundException('Product not found.');
      }
      return updateProduct;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not update Product.');
    }
  }

  @Delete(':id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<Product> {
    try {
      const deletedProduct = await this.productservice.delete(id);
      if (!deletedProduct) {
        throw new NotFoundException('Product not found.');
      }
      return deletedProduct;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not delete Product.');
    }
  }
}

import { Controller,Post,Get,Put,Delete,Body,Param, HttpException, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import { verifyToken } from '../jwt/verifyToken';
@Controller('products')
export class ProductsController {
    constructor(private readonly productservice:ProductsService){}


    @Post('addproduct')
    @UseGuards(verifyToken)
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileName = `${Date.now()}${path.extname(file.originalname)}`;
                cb(null, fileName);
            }
        })
    }))

    async create(@UploadedFile() file, @Body() productdto: ProductDto): Promise<any> {
        try {
            const imageUrl = file.filename; 
            const newProduct = await this.productservice.create({ ...productdto, image: imageUrl });
            return {newProduct};
        } catch (error) {
            throw new HttpException({ error: 'Product creation failed' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Get('/getproducts')
    @UseGuards(verifyToken)
    async findAll():Promise<any>{
        try{
            const allProducts = await this.productservice.findAll()
            return {allProducts}
        }catch(error){
            throw new HttpException({ error:'products not found'},HttpStatus.INTERNAL_SERVER_ERROR)
        }        
    };

    @Get(':id')
    @UseGuards(verifyToken)
    async findOne(@Param('id') id:string):Promise<any>{
        try{
            const Product = await this.productservice.findOne(id)
            return { Product}
        }catch(error){
            throw new HttpException({ error:'product not found'},HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':id')
    @UseGuards(verifyToken)
    async update(@Param('id') id:string, @Body() productdto:ProductDto):Promise<any>{
        try{
            const updateProduct = await this.productservice.update(id,productdto)
            return {updateProduct}
        }catch(error){
            throw new HttpException({error:'product update failed'},HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    @Delete(':id')
    @UseGuards(verifyToken)
    async remove(@Param('id') id:string):Promise<any>{
        try{
            const deletedProduct = await this.productservice.remove(id)
            return { deletedProduct }
        }catch(error){
            throw new HttpException({error:'failed to delete product'},HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }
}

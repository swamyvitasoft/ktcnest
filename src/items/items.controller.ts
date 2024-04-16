import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsDto } from '../items/dto/items.dto';
import { Items } from './schema/items.schema';
import { verifyToken } from '../jwt/verifyToken';
import { validate } from 'class-validator';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) {}

 @Post('/additem')
  @UseGuards(verifyToken)
 async create(@Body() itemsDto: ItemsDto): Promise<any> {
  try{
    const newItem = await this.itemsService.create(itemsDto);
    return { newItem }  
  }catch(error){
    throw new HttpException({error:' item adding failed'},HttpStatus.INTERNAL_SERVER_ERROR)
  }
   
 }

 @Get('/getItems')
 @UseGuards(verifyToken)
    async findAll(): Promise<any> {
      try{
        const allItems = await this.itemsService.findAll()
        return { allItems }
      }catch(error){
        throw new HttpException({ error:'items not found'},HttpStatus.INTERNAL_SERVER_ERROR)
      }
      
    }

 @Get(':id')
 @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<any> {
    try{
      const item = await this.itemsService.findOne(id);
      return { item }
    }catch(error){
      throw new HttpException({ error:'item not found'},HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  @Put('/update/:id')
  @UseGuards(verifyToken)
  async update(@Param('id') id: string, @Body() itemsDto: ItemsDto): Promise<any> {
    try{
      const errors = await validate(itemsDto);
      if (errors.length > 0) {
        throw new HttpException({ error: 'Validation failed', details: errors }, HttpStatus.BAD_REQUEST);
      }
      const updateItem = await this.itemsService.update(id, itemsDto);
      if (!updateItem) {
        throw new HttpException({ error: 'item not found' }, HttpStatus.NOT_FOUND);
      }
      return { updateItem}
    }catch(error){
      throw new HttpException({ error:'item update failed' },HttpStatus.INTERNAL_SERVER_ERROR)
    }    
  }

  @Delete('/delete/:id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<any> {
    try{
      const deleteItem = await this.itemsService.remove(id)
      return {deleteItem}
    }catch(error){
      throw new HttpException({ error:'item delete failed'},HttpStatus.INTERNAL_SERVER_ERROR)
    }    
  }

}

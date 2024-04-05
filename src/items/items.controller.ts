import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsDto } from '../items/dto/items.dto';
import { Items } from './schema/items.schema';
import { verifyToken } from '../jwt/verifyToken';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) {}

 @Post()
  @UseGuards(verifyToken)
 async create(@Body() itemsDto: ItemsDto): Promise<Items> {
   return this.itemsService.create(itemsDto);
 }

 @Get()
 @UseGuards(verifyToken)
    async findAll(): Promise<Items[]> {
      return this.itemsService.findAll();
    }

 @Get(':id')
 @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<Items> {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(verifyToken)
  async update(@Param('id') id: string, @Body() itemsDto: ItemsDto): Promise<Items> {
    return this.itemsService.update(id, itemsDto);
  }

  @Delete(':id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<void> {
    this.itemsService.remove(id);
  }


}

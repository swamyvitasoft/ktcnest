import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsDto } from './dto/items.dto';
import { Items } from './schema/items.schema';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) {}

 @Post()
 async create(@Body() itemsDto: ItemsDto): Promise<Items> {
   return this.itemsService.create(itemsDto);
 }

 @Get()
    async findAll(): Promise<Items[]> {
      return this.itemsService.findAll();
    }

 @Get(':id')
  async findOne(@Param('id') id: string): Promise<Items> {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() itemsDto: ItemsDto): Promise<Items> {
    return this.itemsService.update(id, itemsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.itemsService.remove(id);
  }


}

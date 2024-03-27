import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesDto } from './dto/sales.dto';
import { Sales } from './schema/sales.schema';

@Controller('sales')
export class SalesController {
  
    constructor(private readonly salesService: SalesService) {}

 @Post()
 async create(@Body() salesDto: SalesDto): Promise<Sales> {
   return this.salesService.create(salesDto);
 }
 
 @Get()
    async findAll(): Promise<Sales[]> {
      return this.salesService.findAll();
    }

 @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sales> {
    return this.salesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() salesDto: SalesDto): Promise<Sales> {
    return this.salesService.update(id, salesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.salesService.remove(id);
  }
}

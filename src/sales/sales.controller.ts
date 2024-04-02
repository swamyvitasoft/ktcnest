import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesDto } from './dto/sales.dto';
import { Sales } from './schema/sales.schema';
import { verifyToken } from '../jwt/verifyToken';

@Controller('sales')
export class SalesController {
  
    constructor(private readonly salesService: SalesService) {}

 @Post()
 @UseGuards(verifyToken)
 async create(@Body() salesDto: SalesDto): Promise<Sales> {
   return this.salesService.create(salesDto);
 }
 
 @Get()
 @UseGuards(verifyToken)
    async findAll(): Promise<Sales[]> {
      return this.salesService.findAll();
    }

 @Get(':id')
 @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<Sales> {
    return this.salesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(verifyToken)
  async update(@Param('id') id: string, @Body() salesDto: SalesDto): Promise<Sales> {
    return this.salesService.update(id, salesDto);
  }

  @Delete(':id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<void> {
    this.salesService.remove(id);
  }
}

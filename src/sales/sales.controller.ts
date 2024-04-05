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
 };
 
 @Get()
 @UseGuards(verifyToken)
    async findAll(): Promise<Sales[]> {
      return this.salesService.findAll();
    };

 @Get('topsales')
 @UseGuards(verifyToken)
    async getTopSales(): Promise<any> {
        return this.salesService.getTopSales();
    };

 @Get('customers')
 @UseGuards(verifyToken)
    async getCustomers(): Promise<any> {
        return this.salesService.getCustomers();
    };

 @Get('yearly') 
 @UseGuards(verifyToken)
    async getYearly(): Promise<any> {
        return this.salesService.getYearly();
    };

  @Get('monthly') 
  @UseGuards(verifyToken)
  async getMonthly(): Promise<any> {
      return this.salesService.getMonthly();
  }

  @Get('daily') 
  @UseGuards(verifyToken)
  async getDaily(): Promise<any> {
      return this.salesService.getDaily();
  }

  @Post('exports') 
  @UseGuards(verifyToken)
  async getExport(@Body() body): Promise<any> {
      const { datefrom, dateto } = body;
      return this.salesService.getExport(datefrom, dateto);
  }

 @Get(':id')
 @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<Sales> {
    return this.salesService.findOne(id);
  };

  @Put(':id')
  @UseGuards(verifyToken)
  async update(@Param('id') id: string, @Body() salesDto: SalesDto): Promise<Sales> {
    return this.salesService.update(id, salesDto);
  };

  @Delete(':id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<void> {
    this.salesService.remove(id);
  };

  
 
};

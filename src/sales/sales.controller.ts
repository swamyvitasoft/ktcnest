import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesDto } from './dto/sales.dto';
import { Sales } from './schema/sales.schema';
import { verifyToken } from '../jwt/verifyToken';
import { validate } from 'class-validator';


@Controller('sales')
export class SalesController {
  
    constructor(private readonly salesService: SalesService) {}

 @Post()
 @UseGuards(verifyToken)
 async create(@Body() salesDto: SalesDto): Promise<any> {
    try{
      const newSale = await this.salesService.create(salesDto);
      return{ newSale }
    }catch(error){
      throw new HttpException({ error:'sale adding failed' },HttpStatus.INTERNAL_SERVER_ERROR)
    }
   
 };
 
 @Get('')
 @UseGuards(verifyToken)
    async findAll(): Promise<any> {
      try{
        const allSales = await this.salesService.findAll();
        return { allSales }
      }catch(error){
        throw new HttpException({ error:'sales not found' },HttpStatus.INTERNAL_SERVER_ERROR)
      }
       
    };

@Get('totalsales')
 @UseGuards(verifyToken)
  async totalSales(): Promise<Sales[]> {
   return this.salesService.totalSales();
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

  @Post('monthly') 
  @UseGuards(verifyToken)
  async getMonthly(): Promise<any> {
      return this.salesService.getMonthly();
  }

  @Post('daily') 
  @UseGuards(verifyToken)
  async getDaily(): Promise<any> {
      return this.salesService.getDaily();
  }

  @Post('exports') 
  @UseGuards(verifyToken)
  async getExport(@Body() body): Promise<any> {
    try {
      const { datefrom, dateto } = body;
      if (!datefrom || !dateto) {
          throw new HttpException('Date parameters are missing', HttpStatus.BAD_REQUEST);
      }

        const fromDate = new Date(datefrom);
        const toDate = new Date(dateto);

        if (toDate <= fromDate) {
            throw new HttpException('End date must be after the start date', HttpStatus.BAD_REQUEST);
        }

      const currentDate = new Date();
        const Dateto = new Date(dateto);

        const currentDateWithoutTime = new Date(currentDate.toDateString());
        const toDateWithoutTime = new Date(Dateto.toDateString());

        if (toDateWithoutTime > currentDateWithoutTime) {
            throw new HttpException('End date must be today or before today', HttpStatus.BAD_REQUEST);
        }

      return await this.salesService.getExport(datefrom, dateto);
  } catch (error) {
      if (error instanceof HttpException) {
          throw error; 
      } else {
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  }

 @Get(':id')
 @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<any> {
    try{
      const sale = await this.salesService.findOne(id);
      return { sale }
    }catch(error){
      throw new HttpException({ error:'sale not found'},HttpStatus.INTERNAL_SERVER_ERROR) 
    }
   
  };

  @Put('/update/:id')
  @UseGuards(verifyToken)
  async update(@Param('id') id: string, @Body() salesDto: SalesDto): Promise<any> {
    try{
      const errors = await validate(salesDto);
      if (errors.length > 0) {
        throw new HttpException({ error: 'Validation failed', details: errors }, HttpStatus.BAD_REQUEST);
      }

      const updateSale = await this.salesService.update(id, salesDto);
      if (!updateSale) {
        throw new HttpException({ error: 'Sale not found' }, HttpStatus.NOT_FOUND);
      }
      return { updateSale }
    }catch(error){
      throw new HttpException({ error:'failed to update sale'},HttpStatus.INTERNAL_SERVER_ERROR)
    }    
  };
  

  @Delete('/delete/:id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<any> {
    try{
      const deletedSale = await this.salesService.remove(id);
      if (!deletedSale) {
        throw new HttpException({ error: 'Sale not found' }, HttpStatus.NOT_FOUND);
      }
      return {deletedSale}
    }catch(error){
      throw new HttpException({ error:'failed to delete sale'},HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  };

  
 
};

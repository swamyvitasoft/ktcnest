import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
  async create(@Body() salesDto: SalesDto): Promise<Sales> {
    try {
      const errors = await validate(salesDto);
      if (errors.length > 0) {
        throw new BadRequestException('Validation failed.');
      }
      return await this.salesService.create(salesDto);
    } catch (error) {
      throw new InternalServerErrorException('sale adding failed');
    }
  }

  @Get()
  @UseGuards(verifyToken)
  async findAll(): Promise<Sales[]> {
    try {
      return await this.salesService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('sales not found.');
    }
  }

  @Put(':id')
  @UseGuards(verifyToken)
  async update(
    @Param('id') id: string,
    @Body() salesDto: SalesDto,
  ): Promise<Sales> {
    try {
      const errors = await validate(salesDto);
      if (errors.length > 0) {
        throw new BadRequestException('Validation failed.');
      }
      const Sale = await this.salesService.update(id, salesDto);
      if (!Sale) {
        throw new NotFoundException('Sale not found.');
      }
      return Sale;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not update Sale.');
    }
  }

  @Delete(':id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<any> {
    try {
      const Sale = await this.salesService.delete(id);
      if (!Sale) {
        throw new NotFoundException('Sale not found.');
      }
      return Sale;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not delete Sale.');
    }
  }

  @Get('totalsales')
  @UseGuards(verifyToken)
  async totalSales(): Promise<any> {
    try {
      return this.salesService.totalsales();
    } catch (error) {
      throw new InternalServerErrorException('sales not found.');
    }
  }

  @Get('topsales')
  @UseGuards(verifyToken)
  async topSales(): Promise<any> {
    try {
      return this.salesService.topsales();
    } catch (error) {
      throw new InternalServerErrorException('sales not found.');
    }
  }

  @Post('daysales')
  @UseGuards(verifyToken)
  async daySales(@Body() body): Promise<any> {
    try {
      const { month, year } = body;
      return this.salesService.daysales(month, year);
    } catch (error) {
      throw new InternalServerErrorException('sales not found.');
    }
  }

  @Post('monthsales')
  @UseGuards(verifyToken)
  async monthSales(@Body() body): Promise<any> {
    try {
      const { fromYear, nextYear } = body;
      return this.salesService.monthsales(fromYear, nextYear);
    } catch (error) {
      throw new InternalServerErrorException('sales not found.');
    }
  }

  @Get('yearsales')
  @UseGuards(verifyToken)
  async yearSales(): Promise<any> {
    try {
      return this.salesService.yearsales();
    } catch (error) {
      throw new InternalServerErrorException('sales not found.');
    }
  }

  @Post('exports')
  @UseGuards(verifyToken)
  async Exports(@Body() body): Promise<any> {
    try {
      const { datefrom, dateto } = body;
      if (!datefrom || !dateto) {
        throw new BadRequestException('Date parameters are missing.');
      }
      const fromDate = new Date(datefrom);
      const toDate = new Date(dateto);
      if (toDate <= fromDate) {
        throw new BadRequestException('End date must be after the start date.');
      }
      const currentDate = new Date();
      const Dateto = new Date(dateto);
      const currentDateWithoutTime = new Date(currentDate.toDateString());
      const toDateWithoutTime = new Date(Dateto.toDateString());
      if (toDateWithoutTime > currentDateWithoutTime) {
        throw new BadRequestException('End date must be today or before today');
      }
      return await this.salesService.exports(datefrom, dateto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get('customers')
  @UseGuards(verifyToken)
  async Customers(): Promise<any> {
    try {
      return this.salesService.customers();
    } catch (error) {
      throw new InternalServerErrorException('sales not found.');
    }
  }

  @Get(':id')
  @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<Sales> {
    try {
      const Sale = await this.salesService.findOne(id);
      if (!Sale) {
        throw new NotFoundException('Sale not found.');
      }
      return Sale;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not fetch Sale.');
    }
  }
}

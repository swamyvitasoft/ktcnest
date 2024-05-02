import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalesDto } from './dto/sales.dto';
import { Sales } from './schema/sales.schema';

@Injectable()
export class SalesService {
  constructor(@InjectModel('Sales') private salesModel: Model<Sales>) {}

  async create(salesDto: SalesDto): Promise<Sales> {
    const createdSale = new this.salesModel(salesDto);
    return createdSale.save();
  }

  async findAll(): Promise<Sales[]> {
    return this.salesModel.find().exec();
  }

  async findOne(id: string): Promise<Sales> {
    return this.salesModel.findById(id).exec();
  }

  async update(id: string, salesDto: SalesDto): Promise<Sales> {
    return this.salesModel
      .findByIdAndUpdate(id, salesDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Sales> {
    return await this.salesModel.findByIdAndDelete(id).exec();
  }

  async totalsales(): Promise<any> {
    return await this.salesModel.aggregate([
      {
        $match: {
          status: 'active',
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'itemId',
          foreignField: '_id',
          as: 'items',
        },
      },
    ]);
  }

  async topsales(): Promise<any> {
    return await this.salesModel.aggregate([
      {
        $match: {
          status: 'active',
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'itemId',
          foreignField: '_id',
          as: 'items',
        },
      },
      {
        $group: {
          _id: '$itemId',
          count: {
            $sum: 1,
          },
          totalAdvanceAmount: {
            $sum: '$advanceamount',
          },
          totalEstimatedAmount: {
            $sum: '$estimatedamount',
          },
          totalBalanceAmount: {
            $sum: '$balaceamount',
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: '_id',
          as: 'items',
        },
      },
    ]);
  }

  async daysales(month: any, year: any): Promise<any> {
    return await this.salesModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
          },
          status: 'active',
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'itemId',
          foreignField: '_id',
          as: 'items',
        },
      },
      // {
      //   $group: {
      //     _id: {
      //       $month: '$createdAt',
      //     },
      //     createdAt: {
      //       $first: '$createdAt',
      //     },
      //     totalEstimatedAmount: {
      //       $sum: '$estimatedamount',
      //     },
      //     totalAdvanceAmount: {
      //       $sum: '$advanceamount',
      //     },
      //     totalBalanceAmount: {
      //       $sum: '$balaceamount',
      //     },
      //   },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     month: '$_id',
      //     createdAt: 1,
      //     totalEstimatedAmount: 1,
      //     totalAdvanceAmount: 1,
      //     totalBalanceAmount: 1,
      //   },
      // },
    ]);
  }

  async monthsales(fromYear: any, nextYear: any): Promise<any> {
    return await this.salesModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(fromYear, 0, 1),
            $lt: new Date(nextYear, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: '$createdAt',
          },
          createdAt: {
            $first: '$createdAt',
          },
          estimatedTotalAmount: {
            $sum: '$estimatedamount',
          },
          advanceTotalAmount: {
            $sum: '$advanceamount',
          },
          balanceTotalAmount: {
            $sum: '$balaceamount',
          },
        },
      },
    ]);
  }

  async yearsales(): Promise<any> {
    return await this.salesModel.aggregate([
      {
        $match: {
          status: 'active',
        },
      },
      {
        $group: {
          _id: {
            $year: '$createdAt',
          },
          count: {
            $sum: 1,
          },
          totalAdvanceAmount: {
            $sum: '$advanceamount',
          },
          totalEstimatedAmount: {
            $sum: '$estimatedamount',
          },
          totalBalanceAmount: {
            $sum: '$balaceamount',
          },
        },
      },
    ]);
  }

  async exports(datefrom: Date, dateto: Date): Promise<any> {
    return await this.salesModel.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: 'itemId',
          foreignField: '_id',
          as: 'items',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(datefrom),
            $lt: new Date(dateto),
          },
          status: 'active',
        },
      },
    ]);
  }

  async customers(): Promise<any> {
    return await this.salesModel.aggregate([
      {
        $match: {
          status: 'active',
        },
      },
      {
        $group: {
          _id: '$mobileno',
          count: {
            $sum: 1,
          },
          fullname: {
            $first: '$fullname',
          },
          totalAdvanceAmount: {
            $sum: '$advanceamount',
          },
          totalEstimatedAmount: {
            $sum: '$estimatedamount',
          },
          totalBalanceAmount: {
            $sum: '$balaceamount',
          },
        },
      },
    ]);
  }
}

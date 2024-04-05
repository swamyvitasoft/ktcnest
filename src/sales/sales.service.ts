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
        return this.salesModel.findByIdAndUpdate(id, salesDto, { new: true }).exec();
      }
    
      async remove(id: string,): Promise<void> {
        await this.salesModel.findByIdAndDelete(id).exec();
      }

//       async getTopSales(): Promise<any> {
//         try {
//             const topSales = await this.salesModel.aggregate([
//                 {
//                     $match: {
//                         status: "active",
//                     },
//                 },
//                 {
//                   $group: {
//                       _id: "$itemId",
//                       count: {
//                           $sum: 1,
//                       },
//                       totalAdvanceAmount: {
//                           $sum: "$advanceamount",
//                       },
//                       totalEstimatedAmount: {
//                           $sum: "$estimatedamount",
//                       },
//                       totalBalanceAmount: {
//                           $sum: "$balaceamount",
//                       },
//                   },
//               },
//               {
//                 $sort: {
//                     count: -1,
//                 },
//             },
//         ]);
//         return topSales;
//     } catch (err) {
//         throw new Error('Sales not found');
//     }
// }


async getTopSales(): Promise<any> {
    try {
        const topSales = await this.salesModel.aggregate([
            {
                $match: {
                    status: "active",
                },
            },
            {
                $lookup: {
                    from: "items",
                    localField: "itemId",
                    foreignField: "_id",
                    as: "items",
                },
            },
            {
                $group: {
                    _id: "$itemId",
                    count: {
                        $sum: 1,
                    },
                    totalAdvanceAmount: {
                        $sum: "$advanceamount",
                    },
                    totalEstimatedAmount: {
                        $sum: "$estimatedamount",
                    },
                    totalBalanceAmount: {
                        $sum: "$balaceamount",
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
                    from: "items",
                    localField: "_id",
                    foreignField: "_id",
                    as: "items",
                },
            },
        ]);
        return topSales;
    } catch (err) {
        throw new Error('Top sales not found');
    }
}

async getCustomers(): Promise<any> {
    try {
        const allCustomers = await this.salesModel.aggregate([
            {
                $match: {
                    status: "active",
                },
            },
            {
                $group: {
                    _id: "$mobileno",
                    count: {
                        $sum: 1,
                    },
                    fullname: {
                        $first: "$fullname",
                    },
                    totalAdvanceAmount: {
                        $sum: "$advanceamount",
                    },
                    totalEstimatedAmount: {
                        $sum: "$estimatedamount",
                    },
                    totalBalanceAmount: {
                        $sum: "$balaceamount",
                    },
                },
            },
        ]);
        return allCustomers;
    } catch (err) {
        throw new Error('Customers not found');
    }
};


async getYearly(): Promise<any> {
    try {
        const yearlyData = await this.salesModel.aggregate([
            {
                $match: {
                    status: "active",
                },
            },
            {
                $group: {
                    _id: {
                        $year: "$createdAt",
                    },
                    count: {
                        $sum: 1,
                    },
                    totalAdvanceAmount: {
                        $sum: "$advanceamount",
                    },
                    totalEstimatedAmount: {
                        $sum: "$estimatedamount",
                    },
                    totalBalanceAmount: {
                        $sum: "$balaceamount",
                    },
                },
            },
        ]);
        return yearlyData;
    } catch (err) {
        throw new Error('Yearly data not found');
    }
};

async getMonthly(): Promise<any> {
    try {
        const monthlyData = await this.salesModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date("Mon, 01 Jan 2024 00:00:00 GMT"),
                        $lt: new Date("Wed, 01 Jan 2025 00:00:00 GMT"),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $month: "$createdAt",
                    },
                    createdAt: {
                        $first: "$createdAt",
                    },
                    estimatedTotalAmount: {
                        $sum: "$estimatedamount",
                    },
                    advanceTotalAmount: {
                        $sum: "$advanceamount",
                    },
                    balanceTotalAmount: {
                        $sum: "$balaceamount",
                    },
                },
            },
        ]);
        return monthlyData;
    } catch (err) {
        throw new Error('Monthly data not found');
    }
};

async getDaily(): Promise<any> {
    try {
        const dailyData = await this.salesModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date("Thu, 01 Apr 2024 00:00:00 GMT"),
                        $lt: new Date("Fri, 01 May 2024 00:00:00 GMT"),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $month: "$createdAt",
                    },
                    createdAt: {
                        $first: "$createdAt",
                    },
                    totalEstimatedAmount: {
                        $sum: "$estimatedamount",
                    },
                    totalAdvanceAmount: {
                        $sum: "$advanceamount",
                    },
                    totalBalanceAmount: {
                        $sum: "$balaceamount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    createdAt: 1,
                    totalEstimatedAmount: 1,
                    totalAdvanceAmount: 1,
                    totalBalanceAmount: 1,
                },
            },
        ]);
        return dailyData;
    } catch (err) {
        throw new Error('Daily data not found');
    }
};


async getExport(datefrom: Date, dateto: Date): Promise<any> {
    try {
        const allSales = await this.salesModel.aggregate([
            {
                $lookup: {
                    from: "items",
                    localField: "itemId",
                    foreignField: "_id",
                    as: "items",
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
                    status: "active",
                },
            },
        ]);
        return allSales;
    } catch (err) {
        throw new Error('Export data not found');
    }
}

};



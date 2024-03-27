import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesSchema } from './schema/sales.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'Sales', schema: SalesSchema }]),
  ],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}

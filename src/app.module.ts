import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ktcnest'),
    SalesModule,
    ItemsModule,
    AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

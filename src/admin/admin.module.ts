import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminSchema } from './schema/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name:'Admin', schema:AdminSchema}])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}

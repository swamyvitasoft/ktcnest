import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsSchema } from './schema/items.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Items', schema: ItemsSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}

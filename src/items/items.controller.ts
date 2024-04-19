import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsDto } from '../items/dto/items.dto';
import { Items } from './schema/items.schema';
import { verifyToken } from '../jwt/verifyToken';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(verifyToken)
  async create(@Body() itemsDto: ItemsDto): Promise<Items> {
    try {
      return await this.itemsService.create(itemsDto);
    } catch (error) {
      throw new InternalServerErrorException('item adding failed');
    }
  }

  @Get()
  @UseGuards(verifyToken)
  async findAll(): Promise<Items[]> {
    try {
      return await this.itemsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Could not fetch items.');
    }
  }

  @Get(':id')
  @UseGuards(verifyToken)
  async findOne(@Param('id') id: string): Promise<Items> {
    try {
      const item = await this.itemsService.findOne(id);
      if (!item) {
        throw new NotFoundException('Item not found.');
      }
      return item;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not fetch items.');
    }
  }

  @Put(':id')
  @UseGuards(verifyToken)
  async update(
    @Param('id') id: string,
    @Body() itemsDto: ItemsDto,
  ): Promise<Items> {
    try {
      const updateItem = await this.itemsService.update(id, itemsDto);
      if (!updateItem) {
        throw new NotFoundException('item not found.');
      }
      return updateItem;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('item update failed.');
    }
  }

  @Delete(':id')
  @UseGuards(verifyToken)
  async remove(@Param('id') id: string): Promise<Items> {
    try {
      const Item = await this.itemsService.delete(id);
      if (!Item) {
        throw new NotFoundException('Item not found.');
      }
      return Item;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not delete admin.');
    }
  }
}

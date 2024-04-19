import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './schema/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(readonly adminService: AdminService) {}

  @Post()
  async create(@Body() adminDto: AdminDto): Promise<Admin> {
    try {
      return await this.adminService.create(adminDto);
    } catch (error) {
      throw new InternalServerErrorException('admin creation failed');
    }
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    try {
      return await this.adminService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Could not fetch admin.');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    try {
      const Admin = await this.adminService.findOne(id);
      if (!Admin) {
        throw new NotFoundException('Admin not found.');
      }
      return Admin;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not fetch admin.');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() adminDto: AdminDto,
  ): Promise<Admin> {
    try {
      const Admin = await this.adminService.update(id, adminDto);
      if (!Admin) {
        throw new NotFoundException('Admin not found.');
      }
      return Admin;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not update Admin.');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Admin> {
    try {
      const Admin = await this.adminService.delete(id);
      if (!Admin) {
        throw new NotFoundException('Admin not found.');
      }
      return Admin;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not delete admin.');
    }
  }

  @Post('login')
  async login(@Body() adminLoginDto: AdminDto): Promise<any> {
    try {
      const { token, admin } = await this.adminService.login(adminLoginDto);
      if (!admin) {
        throw new NotFoundException('Admin not found.');
      }
      return { token, admin };
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Could not find admin details.');
    }
  }

  @Post('forgotpassword')
  async forgotLogin(@Body('mobileno') mobileno: string): Promise<any> {
    try {
      const Admin = await this.adminService.forgotLogin(mobileno);
      if (!Admin) {
        throw new NotFoundException('Admin not found.');
      }
      return Admin;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Email not sent.');
    }
  }
}

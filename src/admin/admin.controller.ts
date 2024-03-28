import { Controller,Post,Get,Put,Delete,Body,Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './schema/admin.schema';


@Controller('admin')
export class AdminController {
    constructor(
        readonly adminService:AdminService,
        
        ){}

    @Post()
    async create(@Body() adminDto:AdminDto): Promise<Admin>{
        return this.adminService.create(adminDto)
    }

    @Post('login')
    async login(@Body() adminLoginDto: AdminDto): Promise<any> {
        const token = await this.adminService.login(adminLoginDto.mobileno, adminLoginDto.password);
        return { token,adminLoginDto };
    }
 
    @Get()
    async findAll(): Promise<Admin[]>{
        return this.adminService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<Admin>{
        return this.adminService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id:string,@Body() adminDto:AdminDto): Promise<Admin>{
        return this.adminService.update(id,adminDto)
    }

    @Delete(':id')
    async remove(@Param('id') id:string):Promise<void>{
        await this.adminService.remove(id)
    }
}

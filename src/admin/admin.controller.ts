import { Controller,Post,Get,Put,Delete,Body,Param, HttpException, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './schema/admin.schema';


@Controller('admin')
export class AdminController {
    constructor(
        readonly adminService:AdminService,
        
        ){}

    @Post()
    async create(@Body() adminDto:AdminDto): Promise<any>{
        try{
            const newAdmin = await this.adminService.create(adminDto)
            return{newAdmin}
        }catch(error){
            throw new HttpException({error:'admin creation failed'},HttpStatus.INTERNAL_SERVER_ERROR)
        }       
    }

    @Post('login')
    async login(@Body() adminLoginDto: AdminDto): Promise<any> {
        try{
            const {admin,token} = await this.adminService.login(adminLoginDto.mobileno, adminLoginDto.password);
            return { admin,token };
        }catch(error){
            throw new HttpException({error:'login failed'},HttpStatus.INTERNAL_SERVER_ERROR)
        }       
    }
 
    @Get()
    async findAll(): Promise<any>{
        try{
            const allAdmins = await this.adminService.findAll()
            return { allAdmins }
        }catch(error){
            throw new HttpException( {error:'admins not found'},HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<any>{
        try{
            const Admin = await this.adminService.findOne(id);
            return { Admin }
        }catch(error){
            throw new HttpException( {error:'admin not found'},HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    @Put(':id')
    async update(@Param('id') id:string,@Body() adminDto:AdminDto): Promise<any>{
        try{
          const Admin = await this.adminService.update(id,adminDto)
          return { Admin}
        }catch(error){
            throw new HttpException({error:'admin update failed'},HttpStatus.INTERNAL_SERVER_ERROR)
        }     
    }

    @Delete(':id')
    async remove(@Param('id') id:string):Promise<any>{
        try{
           const {Admin} = await this.adminService.remove(id)
           return { Admin}
        }catch(error){
            throw new HttpException({error:'admin delete failed'},HttpStatus.INTERNAL_SERVER_ERROR)
        }   
    }

    @Post('forgotpassword')
    async forgotLogin(@Body('mobileno') mobileno: string): Promise<any> {
        await this.adminService.forgotLogin(mobileno);
        return { message: 'Email sent successfully' };
    }
    
}

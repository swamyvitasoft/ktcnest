import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './schema/admin.schema';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private adminModel:Model<Admin>,
   
    ){}

    async create(admindto:AdminDto ): Promise<Admin>{
        const createAdmin = new this.adminModel(admindto)
        return createAdmin.save()
    }

    async login(mobileno: string, password: string): Promise<string> {
        const admin: Admin = await this.adminModel.findOne({ mobileno,password }).exec();

        const secretKey = 'my-secretKey';
        const token = jwt.sign({ mobileno: admin.mobileno, password: admin.password }, secretKey, { expiresIn: '1h' });
        return token;
    }

    async findAll(): Promise<Admin []>{
        return this.adminModel.find().exec()
    }

    async findOne(id:string): Promise<Admin>{
        return this.adminModel.findById(id).exec()
    }

    async update(id:string,admindto:AdminDto): Promise<Admin>{
        return this.adminModel.findByIdAndUpdate(id,admindto,{new:true}).exec()
    }

    async remove(id:string): Promise<void>{
        await this.adminModel.findByIdAndDelete(id).exec()
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './schema/admin.schema';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private adminModel:Model<Admin>,
   
    ){}

    async create(admindto:AdminDto ): Promise<Admin>{
        const createAdmin = new this.adminModel(admindto)
        return createAdmin.save()
    }

    async login(mobileno: string, password: string): Promise<{token:string,admin:Admin}> {
        const admin: Admin = await this.adminModel.findOne({ mobileno,password }).exec();
        const secretKey = 'my-secretKey';
        const token = jwt.sign({ mobileno: admin.mobileno, password: admin.password }, secretKey, { expiresIn: '8h' });
        return {admin,token};
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

    async remove(id:string): Promise<any>{
        const  Admin = await this.adminModel.findByIdAndDelete(id).exec()
        return { Admin}
    }

    async forgotLogin(mobileno: string): Promise<void> {
        const admin: Admin = await this.adminModel.findOne({ mobileno }).exec();
        if (!admin) {
            throw new Error('Admin not found');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gantasandhyavitasoft@gmail.com',
                pass: 'fbkh uzzr zxij ywuv',
            },
        });
        const mailOptions = {
            from: 'gantasandhyavitasoft@gmail.com',
            to: 'sudhakar.vita99@gmail.com',
            subject: `Your ktc mobilepassword: ${admin.mobileno}`,
            text: `Your password is: ${admin.password}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error('Error sending email');
            }
            console.log('Email sent successfully!');
        });
    }
}

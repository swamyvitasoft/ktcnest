import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './schema/admin.schema';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private adminModel: Model<Admin>) {}

  async create(admindto: AdminDto): Promise<Admin> {
    const createAdmin = new this.adminModel(admindto);
    return createAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, admindto: AdminDto): Promise<Admin> {
    return this.adminModel
      .findByIdAndUpdate(id, admindto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Admin> {
    return await this.adminModel.findByIdAndDelete(id).exec();
  }

  async login(admindto: AdminDto): Promise<{ token: string; admin: Admin }> {
    const secretKey = 'my-secretKey';
    const token = jwt.sign(admindto, secretKey, { expiresIn: '365d' });
    const admin = await this.adminModel.findOne(admindto).exec();
    return { token, admin };
  }

  async forgotLogin(mobileno: string): Promise<any> {
    const admin = await this.adminModel.findOne({ mobileno:mobileno }).exec();
    if (!admin) {
      return new NotFoundException('admin not found');
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
        return new NotFoundException('mail sending failed');
      }
      return admin;
    });
  }
}

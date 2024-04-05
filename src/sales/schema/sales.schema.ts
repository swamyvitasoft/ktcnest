import mongoose, { Schema, Document } from 'mongoose';

export const SalesSchema = new Schema({
     sno: Number,
     fullname: String,
     address: String,
     mobileno: String,
     particulars: String,
     itemId:mongoose.Schema.Types.ObjectId,
     note: String,
     imei: String,
     estimatedamount: Number,
     advanceamount: Number,
     balaceamount: Number,
     status: String,

    
},
     {timestamps:true}
);

export interface Sales extends Document {
     sno: Number,
     fullname: String;
     address: String;
     mobileno: String;
     particulars: String;
     itemId:mongoose.Schema.Types.ObjectId,
     note: String,
     imei: String;
     estimatedamount: Number;
     advanceamount: Number;
     balaceamount: Number;
     status: String,
}
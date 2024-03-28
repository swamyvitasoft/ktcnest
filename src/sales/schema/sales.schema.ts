import mongoose, { Schema, Document } from 'mongoose';

export const SalesSchema = new Schema({
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
    
},
     {timestamps:true}
);

export interface Sales extends Document {
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
}
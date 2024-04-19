import mongoose, { Schema, Document } from 'mongoose';

export const SalesSchema = new Schema({
     sno:{
          type:Number,
          required:true,
          unique:true
     },
     fullname:{
          type:String,
          required:true
     },
     address:{
          type:String,
          required:true
     },
     mobileno:{
          type:String,
          required:true
     },
     particulars:{
          type:String,
          required:true
     },
     itemId:{
          type:mongoose.Schema.Types.ObjectId,
          required:true
     },
     note:{
          type:String,
          required:true
     },
     imei:{
          type:String,
          required:true
     },
     estimatedamount:{
          type:Number,
          required:true
     },
     advanceamount:{
          type:Number,
          required:true
     },
     balaceamount:{
          type:Number,
          required:true
     },
     status:{
          type:String,
          required:true
     },

    
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
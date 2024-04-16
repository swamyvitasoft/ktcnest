import { Schema, Document } from 'mongoose';

export const ItemsSchema = new Schema({
     itemname:{
          type:String,
          required:true
     },    
     status:{
          type:String,
          required:true
     }
},
{timestamps:true}
);

export interface Items extends Document {
     itemname:String;
     status:String
    
}
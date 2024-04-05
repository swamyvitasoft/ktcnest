import { Schema, Document } from 'mongoose';

export const ItemsSchema = new Schema({
     itemname:String,
     status:String
 
},
{timestamps:true}
);

export interface Items extends Document {
     itemname:String;
     status:String
    
}
import { Schema, Document } from 'mongoose';

export const ItemsSchema = new Schema({
     itemname: String,
 
},
{timestamps:true}
);

export interface Items extends Document {
     itemname: String;
    
}
import { Schema, Document } from 'mongoose';

export const ItemsSchema = new Schema({
     itemname: String,
   
});

export interface Items extends Document {
     itemname: String;
    
}
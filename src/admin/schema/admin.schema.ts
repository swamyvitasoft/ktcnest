import { Schema, Document} from "mongoose";


export const AdminSchema = new Schema({
    mobileno:String,
    password:String
},
    {timestamps:true}
);

export interface Admin extends Document{
    mobileno:String,
    password:String
}
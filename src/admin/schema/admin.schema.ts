import { Schema, Document} from "mongoose";

export const AdminSchema = new Schema({
    mobileno: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export interface Admin extends Document {
    mobileno: String;
    password: String;
}

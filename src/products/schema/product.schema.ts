import { Schema, Document} from "mongoose";

export const productSchema = new Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

export interface Product extends Document {
    productname: String;
    price: Number;
    image: String;
}

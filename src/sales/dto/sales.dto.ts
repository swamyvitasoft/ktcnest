import mongoose from "mongoose";

export class SalesDto {
    readonly sno: Number;
    readonly fullname: string;
    readonly address: string;
    readonly mobileno: string;
    readonly particulars: string;
    readonly itemId:mongoose.Schema.Types.ObjectId;
    readonly note: string;
    readonly imei: string;
    readonly estimatedamount: Number;
    readonly advanceamount: Number;
    readonly balaceamount: Number;
    readonly status: string;

}
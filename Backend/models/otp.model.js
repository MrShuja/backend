import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:String
    }
})
const Schema = mongoose.model("otp", otpSchema)
export default Schema;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
   role: {
    type: String,
    enum : ['admin', 'customer','manager'],
    default:'admin'
   }
})
const user = mongoose.model("Users", userSchema)

export default user;
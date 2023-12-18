import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    name: {
        type: String,
    },

})
const setting = mongoose.model("settings", settingsSchema)

export default setting;
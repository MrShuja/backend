import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({

    image: {
        type: String,
    },

})
const ImageData = mongoose.model("images", imagesSchema)

export default ImageData;
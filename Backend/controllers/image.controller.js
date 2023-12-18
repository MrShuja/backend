import ImageData from "../models/image.model.js"

export const ImageUploading =async (req, res)=>{
    try{
        console.log(req.body);
        const newImage = new ImageData({

            image:req.file ? req.file.filename:undefined,

        })
        await newImage.save()
        res.status(200).json({image:newImage});
    }catch(err){
        res.status(500).json(err.message)
    }

}

import  express  from "express";
import { ImageUploading } from "../controllers/image.controller.js";
import multer from "multer";
import path from 'path';
const router = express.Router();
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "upload/")
    },
    filename:(req,file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

router.post("/upload", upload.single("image"), ImageUploading );


export default router;
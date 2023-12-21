import express from "express"; 
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import userRouter from "./routes/user.route.js"
import userRouter1 from "./routes/image.route.js"
import dotenv from "dotenv"
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = 8000 ||process.env.PORT
const username = process.env.USER;
const password = process.env.PASSWORD;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use("/api", userRouter);
app.use("/",  userRouter1);

  
mongoose.connect(`mongodb+srv://${username}:${password}@shuja.qo1pqqp.mongodb.net/MyDb`).then(()=>{
    console.log("Database connected")
});



app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})
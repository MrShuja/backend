import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from 'nodemailer'
import crypto from 'crypto';
import otpCode from '../models/otp.model.js'
import user from "../models/user.model.js";


// register new user
export const register = async (req, res) => {

    try {
        console.log("Called")
        const { email, password, name, gender } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User Already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, name, gender, password: hashPassword }, process.env.PRIVATE_KEY);
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message:"error occur"})
    }
}

//login
export const login = async (req, res) => {
    try {
        console.log("Called")
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not exists" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Password not matched" })
        }
        const token = jsonwebtoken.sign({id:user.id, role:user.role, email:user.email, password:user.password}, 'SKJDHSKD655454SLKDJSISJCIOSSD56FF5DD54D5VCCDVC45DV45', {expiresIn:"1hr"})
        console.log(token)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
 // Admin route handler
 export const adminRouteHandler = (req, res) => {
    res.json({ message: 'Welcome to the admin panel' });
  };

//get All Users

export const getAllUsers = async (req, res) => {
    try {
        console.log("geting data")
        const users = await User.find()
        if (!users) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const forgetPassword = async (req, res)=> {
    try{
        console.log("this is ok")
        const {email} = req.body;
        const user = await User.findOne({email})
        if(user){
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });
            
            const otp=crypto.randomBytes(3).toString('hex')
            console.log(`the otp is "  ${otp}`)
            const mailOptions={
                from: "shujabinrehmat@gmail.com",
                to: email,
                subject: "Password rest OTP",
                text:`your otp is ${otp}`
            }
            transporter.sendMail(mailOptions)

            const otpSave = new otpCode({
                email,
                otp
            })
            await otpSave.save()
            res.status(200).json({message:"OTP send successfully"})
        }

    }catch(err){
        res.status(501).json({message:"OTP sending fail"})
}
}
export const verifyOtp = async (req, res)=>{
    try{
        const {email, otp, newPassword} = req.body
        const otpVerify = await otpCode.findOne({email, otp})

        if(!otpVerify){
            return res.status(400).json({message:"invalid OTP"})
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({email}, {$set: {password:hashPassword}});
        await otpCode.deleteOne({email})
        res.status(200).json({message:"password changed successfully"})
    }catch(err){
        console.log("501 error occur")
        res.status(501).json({message:err.message })
    }
}
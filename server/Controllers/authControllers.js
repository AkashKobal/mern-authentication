import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import transporter from "../config/nodeMailer.js";


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name : name, /* model field name : defined field name */
            email : email,
            password: hashedPassword,
        });
        await newUser.save();
        
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log(token);
        
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

        // send email to user
        const mailMessage = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verify your account",
            text: `Hello ${name}, please click on this link to verify your account:`,
            html: `Hello ${name}, please click on this link to verify your account`,
        };

        await transporter.sendMail(mailMessage);

        res.status(201).json({ success: true,message: "User created successfully",token });
    }
    catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log(token);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ success: true, message: "Login successful" });
    }
    catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 0,
        });
        res.status(200).json({ success: true, message: "Logout successful" });
    }
    catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


export const sendOtpToEmail = async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from request body
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Use findById correctly
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account is already verified" });
        }

        const otp = Math.floor(900000 * Math.random() + 100000).toString().padStart(6, '0');
        const otpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = otpExpireAt;
        console.log(otp);

        await user.save();

        const mailMessage = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your account",
            text: `Hello ${user.name}, your OTP is ${otp}`,
        };

        console.log(mailMessage);

        await transporter.sendMail(mailMessage);

        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const verifyEmailOtp = async (req, res) => {
    const {otp,userId} = req.body;
    // const userId = req.params.userId;
    console.log(req.body);
    

    if (!otp) {
        return res.status(400).json({ success: false, message: "OTP is required" });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();
        res.status(200).json({ success: true, message: "Account verified successfully" });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ success: false, message: error.message });
    }
};


export const isAuthenticated = async (req, res) => {
    try {
        const userId = req.userId; // Updated
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
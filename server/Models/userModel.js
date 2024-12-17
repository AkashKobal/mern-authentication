import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyOtp: {
        type: String,
        default: "",
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    resetOtp: {
        type: String,
        default: "",
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0,
    },
    isResetOtpVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        default:"user",
        type: String,
    },
}, { timestamps: true });


const userModel = mongoose.model.User || mongoose.model("User", userSchema); // first check if User collection already exists or not, if not then create new collection with name User
export default userModel;
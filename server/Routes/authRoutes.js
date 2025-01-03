import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendOtpToEmail, sendResetPasswordOtp, verifyEmailOtp } from '../Controllers/authControllers.js';
import { loginValidation, registerValidation, userAuth } from '../Middleware/authValidation.js';


const authRouter = express.Router();


authRouter.post('/register',registerValidation, register);
authRouter.post('/login',loginValidation, login);
authRouter.post('/logout', logout);

authRouter.post('/send-otp',userAuth,sendOtpToEmail );
authRouter.post('/verify-otp',userAuth,verifyEmailOtp );

authRouter.post('/isAuthenticated',userAuth,isAuthenticated );

authRouter.post('/sendResetPasswordOtp',sendResetPasswordOtp);
authRouter.post('/resetPassword',resetPassword);



export default authRouter;
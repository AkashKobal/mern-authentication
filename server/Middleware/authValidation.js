import Joi from 'joi'
import jwt from 'jsonwebtoken'
const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: `Bad request: ${error.details[0].message}` })
    }
    next();
};


const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: `Bad request: ${error.details[0].message}` })
    }
    next();
}


const userAuth = async (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken.userId) {
            req.body = { ...req.body, userId: decodedToken.userId }; // Preserve existing body data
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    } catch (error) {
        console.error('JWT Error:', error.message);
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};



export { registerValidation, loginValidation, userAuth }
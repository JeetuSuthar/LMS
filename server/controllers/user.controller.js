import {User} from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }
        const user = await User.findOne({
            email
        })
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            msg: "Account Created Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Failed to register/signup"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect email or password"
            })
        }
        const isPassMatch = await bcrypt.compare(password, user.password)
        if (!isPassMatch) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect email or password"
            })
        }
        generateToken(res,user,`Welcome back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Failed to login"
        })
    }
}
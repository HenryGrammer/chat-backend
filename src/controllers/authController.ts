import UserModel from "../model/userModel"
import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()})
            } 
            else {
                const { email, password } = req.body
                const data = await UserModel.findOne(email) 
                const user = data[0]
                if(!user) {
                    return res.status(400).json({message: "User not found"})
                }
        
                const validPassword = bcrypt.compareSync(password, user.password)
                if(!validPassword) {
                    return res.status(400).json({message: "Invalid password"})
                }
        
                const token = jwt.sign(req.body, process.env.JWT_SECRET as string, {
                    expiresIn: "1h"
                })

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict"
                })
        
                return res.status(200).json({token})
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
    
            res.json(200).json({message:"Successfully Logout"})
        } catch (error) {
            console.error(error);
        }
    }
}

export default AuthController
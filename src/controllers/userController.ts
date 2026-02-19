import { Request, Response } from "express"
import UserModel from "../model/userModel"
import { validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class UserController {
    static async get(req:Request, res: Response) {
        try {
            const users = await UserModel.getUser()
            res.status(200).json(users)
        } catch (error:unknown) {
            if (error instanceof Error) {
                res.status(500).json({message: "Internal server error", error: error.message})
            }
        }
    }

    static async store(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()})
            } 
            else {
                const checkUser = await UserModel.findOne(req.body.email)
    
                if(checkUser.length === 1) {
                    return res.status(409).json({message: "The user is existing in our records"})
                }
                else { 
                    const user = await UserModel.addUser(req.body)
    
                    return res.status(201).json({message: "Successfully Saved", data: user})
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({message: "Internal server error", errors: error.message})
            }
        }
    }

    static async login(req: Request, res: Response) {
        try {
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
    
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {
                expiresIn: "1h"
            })
    
            return res.status(200).json({token})
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserController
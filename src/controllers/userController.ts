import { Request, Response } from "express"
import UserModel from "../model/userModel"
import { validationResult } from "express-validator"

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
                const checkUser = await UserModel.ifUserExists(req.body.email)
    
                if(checkUser.length === 1) {
                    res.status(409).json({message: "The user is existing in our records"})
                }
                else { 
                    const user = await UserModel.addUser(req.body)
    
                    res.status(201).json({message: "Successfully Saved", data: user})
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({message: "Internal server error", errors: error.message})
            }
        }
    }
}

export default UserController
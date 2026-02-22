import { Request, Response } from "express"
import jwt from "jsonwebtoken"

class HomeController {
    static async get(req: Request, res: Response) {
        
        return res.status(200).json({message: "Home"})
    }
}

export default HomeController
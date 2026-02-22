import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1]

    if (!token) {
        res.status(401).json({message: "Unauthorized access"})
        return
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                res.status(401).json(err)
                return
            }

            (req as any).user = decoded

            next()
        })
        
    } catch (error) {
        res.status(401).json({message: "Unauthorized access"})
    }    
}

export default authMiddleware
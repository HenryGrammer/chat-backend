import { Router } from "express"
import UserController from "../controllers/userController"
import { body, query } from "express-validator"

const userRouter = Router()

userRouter.get("/", UserController.get)
userRouter.post(
    "/store", 

    body("name")
        .notEmpty().withMessage("Name is required.")
        .isLength({min:2}).withMessage("Name must be at least 2 characters long"),

    body("email")
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .notEmpty().withMessage("Password is required."),

    body("password_confirm")
        .notEmpty().withMessage("Password confirm is required.")
        .custom((value, {req}) => {
            if(value != req.body.password) {
                throw new Error("Password confirmation does not match password")
            }

            return true
        }),

    UserController.store
)


export default userRouter
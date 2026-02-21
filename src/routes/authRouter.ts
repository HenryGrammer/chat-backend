import { Router } from "express";
import AuthController from "../controllers/authController";
import { body } from "express-validator";

const router = Router()

router.post("/login", 
    
    body("email")
        .notEmpty().withMessage("Email is required."),

    body("password")
        .notEmpty().withMessage("Password is required."),

    AuthController.login)

router.post("logout", AuthController.logout)

export default router
import { Router } from "express";
import HomeController from "../controllers/homeController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

router.get("/", HomeController.get)

export default router
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import databaseConnection from "./connection/database"

// Router
import userRouter from "./routes/userRouter"
import authRouter from "./routes/authRouter"
import homeRouter from "./routes/homeRouter"
import authMiddleware from "./middleware/authMiddleware"

dotenv.config()

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Auth
app.use("/api/auth", authRouter)
// User
app.use("/api/users", userRouter)
// Home
app.use("/api/home", authMiddleware, homeRouter)

databaseConnection.connect(err => {
    if (err) {
        console.error("Error connection :" , err)
        return
    }

    console.log("Yehey! Connected")
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
})

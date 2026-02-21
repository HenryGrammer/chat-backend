import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import databaseConnection from "./connection/database"
import userRouter from "./routes/userRouter"
import authRouter from "./routes/authRouter"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// User
app.use("/api/users", userRouter)

// Auth
app.use("/api/auth", authRouter)

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

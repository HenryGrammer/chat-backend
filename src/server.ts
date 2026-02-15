import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import databaseConnection from "./connection/database"
import userRouter from "./routes/userRouter"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// User
app.use("/api/users", userRouter)

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

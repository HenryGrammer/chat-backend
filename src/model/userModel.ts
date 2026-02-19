import databaseConnection from "../connection/database";
import bcrypt from "bcryptjs"
import { User, UserEmail } from "../types/userTypes";
import { validationResult } from "express-validator";

class UserModel {
    static getUser() {
        const query = "SELECT * FROM users"

        return new Promise((resolve, reject) => {
            databaseConnection.query(query, (err, res) => {
                if (err) {
                    reject(err)
                }

                resolve(res)
            })
        })
    }

    static async addUser(data: User) {
        const { name, email, password, status, role, confirm_password } = data
        const query = "INSERT INTO users (name, email, password, status, role, created_at, updated_at) VALUES (?, ?, ?, 'Active', 'User', now(), now())"
        const hashPassword = await bcrypt.hash(password, 10)
        const values = [name, email, hashPassword, status ,role]

        return await new Promise((resolve, reject) => {
            databaseConnection.query(query, values, (err, res) => {
                if (err) {
                    reject(err)
                }
    
                resolve(res)
            })
        })
    }

    static async findOne(email: string): Promise<UserEmail[]>{
        const query = "SELECT email, password, id FROM users WHERE email = ?"
        const value = [email]

        return await new Promise((resolve, reject) => {
            databaseConnection.query(query, value, (err, res) => {
                if (err) {
                    reject(err)
                }

                resolve(res)
            })
        })
    }
}

export default UserModel
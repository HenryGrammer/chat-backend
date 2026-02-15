import mysql from "mysql"

interface Connection {
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
}

const config: Connection = {
    host: "localhost",
    user: "root",
    password: "",
    database: "chat",
    port: 3307
}

const databaseConnection = mysql.createConnection(config)

export default databaseConnection
export type User = {
    name: string,
    email: string,
    password: string,
    role: string,
    status: string,
    confirm_password: string,
    id?:number
}

export type UserEmail = Pick<User,"email" | "password" | "id">

// export type ErrorMessage = {
//     errors: string
// }

export type LoginForm = {
    email: string,
    password: string
}
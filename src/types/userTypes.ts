export type User = {
    name: string,
    email: string,
    password: string,
    role: string,
    status: string,
    confirm_password: string
}

export type UserEmail = Pick<User,"email">

export type ErrorMessage = {
    errors: string
}
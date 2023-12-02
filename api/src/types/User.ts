export type UserRole = {
    id: number
    name: string
}

export type User = {
    id: number
    username: string
    name?: string
    oldPassword?: string
    password?: string
    role: UserRole | number
    email: string
    active?: boolean
    created?: Date
}
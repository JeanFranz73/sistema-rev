export type UserRoleType = {
    id: number
    name: string
}

export type UserType = {
    id: number
    username: string
    name?: string
    oldPassword?: string
    password?: string
    role: UserRoleType | number
    email: string
    active?: boolean
    created?: Date
}
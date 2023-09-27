export type UserRoleType = {
    id: number
    name: string
}

type UserType = {
    id: number
    username: string
    name?: string
    password?: string
    role: UserRoleType | number
    email: string
    active: boolean
    created_at: Date
}


export default UserType
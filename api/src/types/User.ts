type UserType = {
    id: number
    username: string
    password?: string
    role: number
    email: string
    active: boolean
    created_at: Date
}

export default UserType
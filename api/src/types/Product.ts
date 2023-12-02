export type ProductCategory = {
    id: number
    name: string
    description?: string
    active: boolean
    created: Date
}

export type Product = {
    id: number
    name: string
    description?: string
    category: ProductCategory | number
    price: number
    stock: number
    active: boolean
    created: Date
}
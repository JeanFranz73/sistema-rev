export type ProductCategoryType = {
    id: number
    name: string
    description?: string
    active: boolean
    created: Date
}

export type ProductType = {
    id: number
    name: string
    description?: string
    category: ProductCategoryType | number
    price: number
    stock: number
    active: boolean
    created: Date
}
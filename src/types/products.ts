export interface IProduct {
    id: number
    name: string
    description: string
    ean: string
    upc: string
    image: string
    images: Image[]
    net_price: number
    taxes: number
    price: number
    categories: number[]
    tags: string[]
}

export interface Image {
    title: string
    description: string
    url: string
}
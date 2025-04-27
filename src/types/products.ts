export interface IProductImage {
    title: string;
    description: string;
    url: string;
}

export interface IProductData {
    id: number;
    name: string;
    description: string;
    ean: string;
    upc: string;
    image: string;
    images: IProductImage[];
    net_price: number;
    taxes: number;
    price: number;
    categories: number[];
    tags: string[];
}

export interface IProductApiResponse {
    status: string;
    code: number;
    locale: string;
    seed: string;
    total: number;
    data: IProductData[];
}
import axios from "axios";
import { IProductApiResponse, IProductData} from "@/types/products";

const api = axios.create({
    baseURL: 'https://fakerapi.it/api/v2',
});

const cacheProducts = new Map<string, IProductData[]>();
const totalItemsCache = 50;

export class API {

    /**
     * Получить список продуктов
     * @param quantity - количество продуктов
     * @param page - номер страницы
     * @returns Promise с массивом продуктов
     */
    static async getProducts(quantity: number = 20, page: number = 1): Promise<IProductData[]> {
        const url = `products?_quantity=${quantity}&_page=${page}`;

        if (cacheProducts.size >= totalItemsCache) {
            cacheProducts.clear();
        }

        const cachedData = cacheProducts.get(url);
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await api.get<IProductApiResponse>(url);

            const products = response.data.data;
            cacheProducts.set(url, products);
            return products;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
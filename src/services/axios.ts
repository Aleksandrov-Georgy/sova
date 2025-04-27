import axios, {AxiosResponse} from "axios";
import {IProduct} from "@/types/products";

const api = axios.create({
    baseURL: 'https://fakerapi.it/api/v2',
});

const cacheProducts = new Map<string, IProduct[]>();
const totalItemsCache = 50;

export class API {

    /** Получить список products
     * @param quantity кол-во продуктов
     * @param page № страницы
     * @return IProduct[] - массив продуктов IProduct[]
     * */
    static async getProducts(quantity = 20, page = 1): Promise<IProduct[]> {
        const url = `products?_quantity=${quantity}&page=${page}`;

        if(cacheProducts.size === totalItemsCache) {
            cacheProducts.clear();
        }

        if (cacheProducts.has(url)) {
            return cacheProducts.get(url) || [];
        }

        const {data} = await api.get<string, AxiosResponse<IProduct[]>>(url);
        cacheProducts.set(url, data);
        return data;
    }
}
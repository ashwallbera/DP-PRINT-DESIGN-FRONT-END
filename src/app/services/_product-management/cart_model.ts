import { ProductModel } from "./product_model";

export interface Cart{
    id: string;
    productid: string;
    customerid: string;
    specification: string;
    price: string;
    created: string;
    qty: number;
   // product:ProductModel;
    isDeleted: boolean;
}
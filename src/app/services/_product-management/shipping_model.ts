import { Cart } from "./cart_model";

export interface Shipping{
    // ordName: string;
    id: string;
    customerid: string;
    orderno: string;
    status: string;
    address: string;
    fullname: string;
    paymentMethod: string;
    isDeleted: boolean;
    cart?: Cart[];
}
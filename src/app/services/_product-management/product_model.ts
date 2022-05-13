import { Category } from "./category_model";
import { Specification } from "./specification_model";

export interface ProductModel{
    id: string;
    name: string;
    description: string;
    imgUri: string;
    price: string;
    categoryid: string;
    category: Category[];
    specification: Specification[];
    isDeleted: boolean ;
}
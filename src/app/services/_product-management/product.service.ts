import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from './cart_model';
import { ProductModel } from './product_model';

let url = environment.api;
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiroot = url + '/api/Product';
  constructor(public httpClient: HttpClient) {}

  public getProduct() {
    return this.httpClient.get<ProductModel[]>(`${this.apiroot}`);
  }

  public deleteProduct(id: string){
    console.log(id);
    return this.httpClient.delete<ProductModel[]>(`${this.apiroot}`+"?id="+id);
  }

  public createProduct(product: ProductModel) {
    this.httpClient
      .post<ProductModel>(`${this.apiroot}`, {
       
        name: product.name,
        description: product.description,
        imgUri: product.imgUri,
        price:product.price+"",
        categoryid: product.categoryid,
        category: product.category,
        specification: product.specification,
        isDeleted: product.isDeleted,
      })
      .subscribe((data) => {
        console.log('create product success');
      });
  }

  public addToCart(cart: Cart){
    this.httpClient.post<Cart>(`${this.apiroot}`,{
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      customerid: cart.customerid,
      productId: cart.productid,
      specification: cart.specification,
      price: cart.price,
      created:"SAMPLE",
      isDeleted: true

    })
  }
}

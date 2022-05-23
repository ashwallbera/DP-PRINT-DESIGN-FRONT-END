import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from './cart_model';
import { ProductModel } from './product_model';
import { Shipping } from './shipping_model';

let url = environment.api;
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiroot = url + '/api/Product';
  apiroot2 = url + '/api/Cart';
  apiroot3 = url + '/api/shipping';
  constructor(public httpClient: HttpClient) {}

  public getProduct() {
    return this.httpClient.get<ProductModel[]>(`${this.apiroot}`);
  }

  public deleteProduct(id: string) {
    console.log(id);
    return this.httpClient.delete<ProductModel[]>(
      `${this.apiroot}` + '?id=' + id
    );
  }

  public createProduct(product: ProductModel) {
    this.httpClient
      .post<ProductModel>(`${this.apiroot}`, {
        name: product.name,
        description: product.description,
        imgUri: product.imgUri,
        price: product.price + '',
        categoryid: product.categoryid,
        category: product.category,
        specification: product.specification,
        isDeleted: product.isDeleted,
      })
      .subscribe((data) => {
        console.log('create product success');
      });
  }

  public addToCart(cart: Cart) {
    this.httpClient
      .post<Cart>(`${this.apiroot2}`, {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        customerid: cart.customerid,
        productId: cart.productid,
        specification: cart.specification,
        price: cart.price,
        created: 'SAMPLE',
        isDeleted: true,
        qty: cart.qty,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  public getCart(userid: string) {
    return this.httpClient.get<Cart[]>(
      `${this.apiroot2}` + '?userid=' + userid
    );
  }

  public addToShipping(shipping: Shipping) {
    this.httpClient
      .post<Shipping>(`${this.apiroot3}`, {
        id: shipping.id,
        customerid: shipping.customerid,
        orderno: shipping.orderno,
        status: shipping.status,
        address: shipping.address,
        fullname: shipping.fullname,
        paymentMethod: shipping.paymentMethod,
        isDeleted: false,
        cart: shipping.cart,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  public getShiping(customerid: string) {
    return this.httpClient.get<Shipping[]>(`${this.apiroot3}`+"/customerid?customerid="+customerid);
  }

  public getAllShipping() {
    return this.httpClient.get<Shipping[]>(`${this.apiroot3}`);
  }

  public updateProduct(product: ProductModel) {
    this.httpClient
      .put<ProductModel>(`${this.apiroot}`, {
        id:product.id,
        name: product.name,
        description: product.description,
        imgUri: product.imgUri,
        price: product.price + '',
        categoryid: product.categoryid,
        category: product.category,
        specification: product.specification,
        isDeleted: product.isDeleted,
      })
      .subscribe((data) => {
        console.log('update product success');
      });
  }
}

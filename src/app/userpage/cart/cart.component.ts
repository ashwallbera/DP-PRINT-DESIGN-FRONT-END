import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cart } from 'src/app/services/_product-management/cart_model';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listOfCart: Cart[] = [];
  product: ProductModel ;
  constructor(public router: Router,
    public dialog: MatDialog) {
      //this.product = null;
      this.listOfCart.push({
        id:"",
        productid:"",
        customerid:"",
        specification:"KUNWARE SAMPLE",
        price:"123123123",
        created:"SDSDS",
        qty:5,
        isDeleted:false
      });
      
     }

  ngOnInit(): void {
  }

  backToHome(){
    this.router.navigate(["/userpage"])
  }

  openCheckout() {
    const dialogRef = this.dialog.open(CheckoutComponent, {
    });
  }

}

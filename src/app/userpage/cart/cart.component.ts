import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/services/_login/login_model';
import { Cart } from 'src/app/services/_product-management/cart_model';
import { ProductService } from 'src/app/services/_product-management/product.service';
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

  subtotal: number = 0;
  shipping: number = 300;
  total: number =  0;
  constructor(public router: Router,
    public dialog: MatDialog,
    public product_service: ProductService) {
      //this.product = null;
      // this.listOfCart.push({
      //   id:"",
      //   productid:"",
      //   customerid:"",
      //   specification:"KUNWARE SAMPLE",
      //   price:"123123123",
      //   created:"SDSDS",
      //   qty:5,
      //   isDeleted:false
      // });

      this.getCart();

     }

  ngOnInit(): void {
  }

  getCart(){
    let user: LoginModel[] = JSON.parse(""+localStorage.getItem('dpuser'));
    this.product_service.getCart(user[0].id).subscribe(data => {
      console.log(data);
      this.listOfCart = data;
      this.getTotals();
    })
  }



//public onChange(event: Event): void {
//  if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
  //  const [file] = event.target.files;
  ////}
//}

  getTotals(){
    this.subtotal = 0;
    for(let x = 0 ; x < this.listOfCart.length;x++){
      this.subtotal += parseInt(this.listOfCart[x].price)*this.listOfCart[x].qty;
    }
    this.total = this.subtotal + this.shipping;
  }
  

 
  backToHome(){
    this.router.navigate(["/userpage"])
  }

  openCheckout() {
    if(this.subtotal != 0){
      const dialogRef = this.dialog.open(CheckoutComponent, {
        data:this.listOfCart
      });
     

      }
    }

   



    
  

  somethingChanged(cart: Cart,qty: string){
   if(qty != ""){
    // console.log(qty);
    // let x =  parseInt(cart.price);
    // x*=parseInt(qty);
    //cart.price = x+"";
    cart.qty = parseInt(qty);
    this.getTotals();
   }
  }
}
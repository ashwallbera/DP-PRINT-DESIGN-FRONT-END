import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { LoginModel } from 'src/app/services/_login/login_model';
import { Cart } from 'src/app/services/_product-management/cart_model';
import { ProductService } from 'src/app/services/_product-management/product.service';
import { Shipping } from 'src/app/services/_product-management/shipping_model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  error = false;
  dialog: any;
  user: LoginModel;
  constructor(
    private _formBuilder: FormBuilder,
    public product_service: ProductService,
    @Inject(MAT_DIALOG_DATA) public cart: Cart[],
    public router: Router
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });

    let user: LoginModel[] = JSON.parse(""+localStorage.getItem('dpuser'));
    this.user = {
      id:user[0].id,
      email:user[0].email,
      username:user[0].username,
      password:user[0].password,
      firstname:user[0].firstname,
      lastname:user[0].lastname,
      role:user[0].role

    }
    console.log(cart);
  }

  ngOnInit() {}

  openCheckout() {}

  getInfo() {
    if(this.firstFormGroup.get('firstCtrl')?.value != "" || this.secondFormGroup.get('secondCtrl')?.value != "" || this.thirdFormGroup.get('thirdCtrl')?.value != ""){

      let user: LoginModel[] = JSON.parse(""+localStorage.getItem('dpuser'));
      console.log(this.firstFormGroup.get('firstCtrl')?.value);
      console.log(this.secondFormGroup.get('secondCtrl')?.value);
      console.log(this.thirdFormGroup.get('thirdCtrl')?.value);
  
      // create shipping object
      let v : Shipping;
      v = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        customerid: user[0].id,
        orderno: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: "Order Received by admin",
        address: this.secondFormGroup.get('secondCtrl')?.value+"",
        fullname: this.firstFormGroup.get('firstCtrl')?.value+"",
        paymentMethod: this.thirdFormGroup.get('thirdCtrl')?.value+"",
        isDeleted: false,
        cart: this.cart
      }
  
      this.product_service.addToShipping(v);
      this.router.navigate(["/shipping"]);
      
    }
    
    else{
      const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        data: "Checkout failed!"
      });
    }
  
    // call the shipping api
    
  
  }
  getErrorMessage() {
    if (this.error ) {
      return 'USERNAME OR PASSWORD INCORRECT';
    }
    return '';
  }
}

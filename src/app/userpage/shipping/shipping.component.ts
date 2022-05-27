import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/services/_login/login_model';
import { ProductService } from 'src/app/services/_product-management/product.service';
import { Shipping } from 'src/app/services/_product-management/shipping_model';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  listOfShipping: Shipping[] = [];
  panelOpenState = false;
  user: LoginModel;
  constructor(public router: Router,
    public product_service: ProductService
  ) { 
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
    this.getShipping();
  }

  ngOnInit(): void {
  }

  getShipping(){
    let user: LoginModel[] = JSON.parse(""+localStorage.getItem('dpuser'));
    
    this.product_service.getShiping(user[0].id).subscribe(data =>{
      this.listOfShipping = data;
    });
  }
  backToHome(){
    this.router.navigate(["/userpage"])
  }

}

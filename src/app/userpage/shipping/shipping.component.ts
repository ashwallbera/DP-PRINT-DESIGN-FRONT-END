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
  constructor(public router: Router,
    public product_service: ProductService
  ) { 
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

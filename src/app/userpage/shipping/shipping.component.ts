import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shipping } from 'src/app/services/_product-management/shipping_model';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  listOfShipping: Shipping[] = [];
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  backToHome(){
    this.router.navigate(["/userpage"])
  }

}

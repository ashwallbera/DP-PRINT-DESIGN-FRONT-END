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
  panelOpenState = false;
  constructor(public router: Router
  ) { 

    this.listOfShipping.push({
      ordStatus:"Out for delivery",
      ordNum:12345678,
      ordAdd:"jhfjagfdgfjgsdjf",
    });


  }

  ngOnInit(): void {
  }
  backToHome(){
    this.router.navigate(["/userpage"])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  backToHome(){
    this.router.navigate(["/userpage"])
  }

}

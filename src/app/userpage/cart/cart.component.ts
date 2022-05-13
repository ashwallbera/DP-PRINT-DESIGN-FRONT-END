import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public router: Router,
    public dialog: MatDialog) { }

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

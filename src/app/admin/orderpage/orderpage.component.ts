import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/_product-management/product.service';
import { Shipping } from 'src/app/services/_product-management/shipping_model';

@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrls: ['./orderpage.component.css']
})
export class OrderpageComponent implements OnInit {
  listOfShipping: Shipping[] = [];
  panelOpenState = false;
  constructor(public product_service: ProductService) {
    product_service.getAllShipping().subscribe(data => {
      this.listOfShipping = data;
    });
   }

  ngOnInit(): void {
  }

}

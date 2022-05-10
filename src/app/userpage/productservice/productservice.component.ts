import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/_product-management/product.service';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { ShopNowDialogComponent } from './shop-now-dialog/shop-now-dialog.component';

@Component({
  selector: 'app-productservice',
  templateUrl: './productservice.component.html',
  styleUrls: ['./productservice.component.scss'],
})
export class ProductserviceComponent implements OnInit {
  products: ProductModel[] = [];
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public product_service: ProductService
  ) {
    product_service.getProduct().subscribe((data) => {
      this.products = data;
    });
  }

  openDialog(product: any) {
    if( JSON.parse('' + localStorage.getItem('dpuser')) != undefined){
      console.log(product);
      this.dialog.open(ShopNowDialogComponent, {
        data: product,
      });
    }
    else{
      this.router.navigate(["/signin"]);
    }
   
  }

  addToCard(product: any) {
    console.log(product);
  }

  ngOnInit(): void {}
}

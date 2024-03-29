import { P } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ProductService } from 'src/app/services/_product-management/product.service';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class AdminProductComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ProductModel>();
  products: ProductModel[] = [];
  constructor(
    public product_service: ProductService,
    public dialog: MatDialog
  ) {
    product_service.getProduct().subscribe((data) => {
      this.products = data;
      this.dataSource.data = data;
      console.log(data);
    });
  }
  openDialog(product: any) {
   this.dialog.open(ProductCatalogComponent,{
     data:product
   });
  }

  openConfirmDialog(product: ProductModel){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: "Are you sure do you want to delete this product?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result=="yes"){
        //DELETE PRODUCTS
        this.product_service.deleteProduct(product.id).subscribe((data) => {
          console.log(data);
        });

        this.products.splice(this.products.indexOf(product),1)
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductComponent,{
      
    });
   

    dialogRef.afterClosed().subscribe(result => {
     this.product_service.getProduct().subscribe((data) => {
        this.products = data;
        this.dataSource.data = data;
        console.log(data);
      });
    });

   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}


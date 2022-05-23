import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHeaderComponent } from './header/header.component';
import { AdminSidenavComponent } from './sidenav/sidenav.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProductComponent } from './product/product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ProductCatalogComponent } from './product/product-catalog/product-catalog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipListComponent } from './chip-list/chip-list.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddProductComponent } from './product/add-product/add-product.component';
import { OrderpageComponent } from './orderpage/orderpage.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminSidenavComponent,
    AdminMainComponent,
    AdminHomeComponent,
    AdminProductComponent,
    ProductCatalogComponent,
    ChipListComponent,
    AddProductComponent,
    OrderpageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class AdminModule { }

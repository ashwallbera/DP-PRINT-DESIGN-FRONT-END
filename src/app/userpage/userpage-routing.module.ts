import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ProductserviceComponent } from './productservice/productservice.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ProductserviceComponent,
      },
      {
        path: 'productservice',
        component: ProductserviceComponent,
      },
      {
        path: 'myorders',
        component: MyordersComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserpageRoutingModule {}

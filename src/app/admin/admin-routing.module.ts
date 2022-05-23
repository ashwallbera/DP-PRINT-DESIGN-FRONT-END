import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { OrderpageComponent } from './orderpage/orderpage.component';
import { AdminProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'product',
        component: AdminProductComponent,
      },
      {
        path: 'order',
        component:OrderpageComponent
      },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

import { Component, OnInit, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cart } from 'src/app/services/_product-management/cart_model';
import { LoginModel } from 'src/app/services/_login/login_model';

@Component({
  selector: 'app-shop-now-dialog',
  templateUrl: './shop-now-dialog.component.html',
  styleUrls: ['./shop-now-dialog.component.css'],
})
export class ShopNowDialogComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cartPost: Cart;
  user:LoginModel[];
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: ProductModel
  ) {
    console.log(product);
    console.log(product.id);
    this.user = JSON.parse(""+localStorage.getItem("dpuser"));
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      category: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      params: this._formBuilder.group({}),
    });

    this.product.specification.forEach((param) => {
      (this.secondFormGroup.get('params') as FormGroup).addControl(
        param.name,
        new FormControl()
      );
    });
  }

  addToCart(product: any) {
    let specs = (this.secondFormGroup.get('params') as FormGroup).getRawValue();
    let category = (this.firstFormGroup.get('category') as FormGroup).value;
    console.log(JSON.stringify(specs));
    console.log(category);
    let specificationString =
      'Category: ' +
      category +
      ',' +
      JSON.stringify(specs)
        .replace('{', '')
        .replace('}', '')
        .replace(/["]/g, '')
        .replace(/[:]/g, ': ')
        .replace(/[,]/g, ', ');
    console.log(specificationString);
    //console.log((this.secondFormGroup.get('params') as FormGroup).value)
    console.log(this.product);
    this.cartPost = {
      id: 'E1395F52-2C46-428C-AAE3-204C77B4B609',
      productid: this.product.id,
      customerid: this.user[0].id,
      specification: specificationString,
      price: this.product.price,
      created: 'sample data',
      qty:1,
      isDeleted: false,
    };
    console.log(this.cartPost);
  }
}

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

@Component({
  selector: 'app-shop-now-dialog',
  templateUrl: './shop-now-dialog.component.html',
  styleUrls: ['./shop-now-dialog.component.css'],
})
export class ShopNowDialogComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: ProductModel
  ) {
    console.log(product);
    console.log(product.id);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      category: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      params: this._formBuilder.group({})
    });

   

    this.product.specification.forEach((param) => {
      (this.secondFormGroup.get('params') as FormGroup).addControl(
        param.name,
        new FormControl()
      );
    });

    
  }

  addToCart(product: any) {
    console.log((this.secondFormGroup.get('params') as FormGroup).value)
    console.log(product);
  }
}

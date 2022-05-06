import { Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Specification } from 'src/app/services/_product-management/specification_model';
import { Identification } from 'src/app/services/_product-management/identification_model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})
export class ProductCatalogComponent implements OnInit {
  identityForm: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  specification: Specification[] = [];
  identityofIdentity: ListOfIdentification[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: ProductModel,
    public formBuilder: FormBuilder
  ) {
    this.identityForm = this.formBuilder.group({
      name: '',
      identityArray: this.formBuilder.array([]),
    });
    this.specification = this.product.specification;
  }
 

  ngOnInit(): void {
    //DYNAMIC FORM
    if (this.specification.length != 0) {
      for (let i = 0; i < this.specification.length; i++) {
        this.addIdentityFormMethod(this.specification[i].name);
        this.identityofIdentity.push({
          identity: this.specification[i].identification,
        });
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log('Chiplist');
    // Add our specification
    if (value) {
      this.identityofIdentity.push({
        identity: [
          {
            name: '',
           
          },
        ],
      });
      this.specification.push({
        name: value,
        identification: this.identityofIdentity[0].identity,
      });
      this.addIdentityFormMethod(value + '');
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(specification: Specification): void {
    const index = this.specification.indexOf(specification);

    if (index >= 0) {
      this.specification.splice(index, 1);
      this.identityFormMethod().removeAt(index);
      this.identityofIdentity.splice(index,1);
    }
  }

  /** DYNAMIC FORM TO ADD SPECIFICATION */

  // to get the FormArray in HTML
  identityFormMethod(): FormArray {
    return this.identityForm.get('identityArray') as FormArray;
  }

  // Add FORM
  addIdentityFormMethod(name: string) {
    this.identityFormMethod().push(this.newIdentityFormArrayMethod(name));
  }

  // INSTANCE OF FORM
  newIdentityFormArrayMethod(name: string): FormGroup {
    return this.formBuilder.group({
      identificationfc: name, // sample here is SELECT FORM
      identificationfcinput: '', //  sample here is INPUT FORM
    });
  }

  //Add identity
  addIdentity(name: string, index: number) {
    console.log(name);
    if (name != '') {
      this.identityofIdentity[index].identity.push({
       
        name: name,
      });
    }
    console.log(this.identityFormMethod().get);
  }

  getIdentityArray(index: number) {
    //return this.identityofIdentity[index].identity;
    if (this.identityofIdentity[index].identity != undefined)
      return this.identityofIdentity[index].identity;
    return null;
  }

  removeIdentity(item: Identification, index: number) {
    
    if (item.name != undefined) {
      this.identityofIdentity[index].identity.splice(index, 1);
      console.log(item);
      console.log(index);
      console.log(this.product);
    }
  }
}
interface ListOfIdentification {
  identity: Identification[];
}

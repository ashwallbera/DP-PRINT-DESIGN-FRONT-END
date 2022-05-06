import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Specification } from 'src/app/services/_product-management/specification_model';
import { Identification } from 'src/app/services/_product-management/identification_model';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { ChipListComponent } from '../../chip-list/chip-list.component';
import { ProductService } from 'src/app/services/_product-management/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @ViewChild("chip") chiplist: ChipListComponent;
  productName = "";
  product: ProductModel;
  identityForm: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  specification: Specification[] = [];
  identityofIdentity: ListOfIdentification[] = [];
  constructor(public formBuilder: FormBuilder,public product_service: ProductService) {
    this.identityForm = this.formBuilder.group({
      name: '',
      identityArray: this.formBuilder.array([]),
    });

    
   }

  ngOnInit(): void {
    this.product = {
      id: "",
      name: "",
      description: "",
      imgUri: "AURI",
      categoryid: "",
      category: [],
      specification: [],
      isDeleted: false ,
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

      this.product.specification = this.specification;
      this.addIdentityFormMethod(value + '');
     
      console.log(this.chiplist.getProduct());
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
    }
  }

  createProduct(){
    console.log(this.productName);
    this.product.category = this.chiplist.getProduct();
    console.log(this.product);
    this.product_service.createProduct(this.product);
  }
  

}

interface ListOfIdentification {
  identity: Identification[];
}

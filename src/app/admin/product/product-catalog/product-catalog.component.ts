import { Component, Inject, OnInit, Output,EventEmitter } from '@angular/core';
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Specification } from 'src/app/services/_product-management/specification_model';
import { Identification } from 'src/app/services/_product-management/identification_model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})
export class ProductCatalogComponent implements OnInit {
  isUpdate = false;
  progress: number;
  message: string;
  serverPath: dbPath={
    dbPath:"Resources//Images//no-product-image.png"
  }; 
  @Output() public onUploadFinished = new EventEmitter();
  serverUploaded: any;
  identityForm: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  specification: Specification[] = [];
  identityofIdentity: ListOfIdentification[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: ProductModel,
    public formBuilder: FormBuilder,
    public http: HttpClient
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

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http
      .post('https://localhost:7118/api/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if(event.total){
              this.progress = Math.round(100 * event.loaded / event.total);
            }
          } else if (event.type === HttpEventType.Response) {
            this.isUpdate = true;
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
            this.serverPath = event.body as dbPath
            console.log(event.body);
            console.log(this.serverPath);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  };

  public createImgPath = (serverPath: dbPath) => { 
    if(!this.isUpdate){
      return this.product.imgUri;
    }
    return `https://localhost:7118/${this.serverPath?.dbPath}`; 
  }

  toDb(path: dbPath){
    return path.dbPath;
  }
}
interface ListOfIdentification {
  identity: Identification[];
}

interface dbPath{
  dbPath:string;
}

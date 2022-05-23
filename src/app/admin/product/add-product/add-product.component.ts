import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  progress: number;
  message: string;
  serverPath: dbPath = {
    dbPath: 'Resources//Images//no-product-image.png',
  };

  serverUploaded: any;
  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('chip') chiplist: ChipListComponent;
  productName = '';
  product: ProductModel;
  identityForm: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  specification: Specification[] = [];
  identityofIdentity: ListOfIdentification[] = [];

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public product_service: ProductService
  ) {
    this.identityForm = this.formBuilder.group({
      name: '',
      identityArray: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.product = {
      id: '',
      name: '',
      description: '',
      imgUri: 'AURI',
      price: '',
      categoryid: '',
      category: [],
      specification: [],
      isDeleted: false,
    };
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
        identification: this.identityofIdentity[this.identityofIdentity.length-1].identity,
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
      this.identityofIdentity.splice(index, 1);
    }
  }

  /** DYNAMIC FORM TO ADD SPECIFICATION */

  // to get the FormArray in HTML
  identityFormMethod(): FormArray {
    return this.identityForm.get('identityArray') as FormArray;
  }

  // Add FORM
  addIdentityFormMethod(name: string) {
    console.log(name);
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
    console.log(index);
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

  createProduct() {
    console.log(this.productName);
    this.product.imgUri = this.createImgPath(this.serverPath);
    this.product.category = this.chiplist.getProduct();
    console.log(this.product);
    console.log(this.identityForm.valid);
    this.product_service.createProduct(this.product);
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
            if (event.total) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            }
          } else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
            this.serverPath = event.body as dbPath;
            console.log(event.body);
            console.log(this.serverPath);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  };

  public createImgPath = (serverPath: dbPath) => {
    return `https://localhost:7118/${this.serverPath?.dbPath}`;
  };

  public getImageFromServer() {}

  toDb(path: dbPath) {
    return path.dbPath;
  }
}

interface ListOfIdentification {
  identity: Identification[];
}

interface dbPath {
  dbPath: string;
}

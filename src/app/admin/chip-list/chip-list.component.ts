import { Component, OnInit, Input } from '@angular/core';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductModel } from 'src/app/services/_product-management/product_model';
import { Category } from 'src/app/services/_product-management/category_model';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css'],
})
export class ChipListComponent implements OnInit {
  @Input() product: ProductModel; // Pass by Admin Product Component 
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  category: Category[] = [];
  constructor() {
    
  }

  ngOnInit(): void {
    if(this.product != undefined){
      this.category = this.product.category;// Add current category
    }
  }
 
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.category.push({name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(category: Category): void {
    const index = this.category.indexOf(category);

    if (index >= 0) {
      this.category.splice(index, 1);
    }
  }
  delete(event:any,year:any)
  {
    event.preventDefault(); //<--prevent default
    event.stopPropagation();  //stop propagation
    //this.data=this.data.filter(x=>x!=year) //<--remove the element from data
    //if (this.value.value==year)
    //    this.value.setValue(null) //<--if the value is the remove data, set null

  }

  //This method use by add product to get the category
  getProduct(): Category[]{
    return this.category;
  }
}

interface Fruit {
  name: string;
}

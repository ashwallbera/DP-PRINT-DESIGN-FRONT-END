import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  message = "";
  isMessage = false;
  ok = "yes";
  constructor(@Inject(MAT_DIALOG_DATA) message: string) { 
    if(message == "There is no item in your cart to checkout!"){
      this.isMessage = true;
      this.ok = "OK";
    }else{
      this.ok = "YES";
    }
    this.message = message;
  }

  ngOnInit(): void {
  }

}

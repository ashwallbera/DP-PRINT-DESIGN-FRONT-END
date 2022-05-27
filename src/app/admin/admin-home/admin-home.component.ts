import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/services/_login/login_model';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  user: LoginModel;
  constructor() { 
    let user: LoginModel[] = JSON.parse(""+localStorage.getItem('dpuser'));
    this.user = {
      id:user[0].id,
      email:user[0].email,
      username:user[0].username,
      password:user[0].password,
      firstname:user[0].firstname,
      lastname:user[0].lastname,
      role:user[0].role

    }
  }

  ngOnInit(): void {
  }

}

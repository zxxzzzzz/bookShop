import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { StateService } from '../service/state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  mailError = false;
  mailValue = '';
  name = '';
  password = '';
  error = false;
  

  constructor(private http:HttpClient, private state:StateService, private router:Router) { }

  ngOnInit() {
  }

  mailChange(value:string){
    let reg = /([a-zA-Z0-9.])*@[a-z0-9]*\.com/;
    if (!reg.test(value)) {
      this.mailError = true;
    }
    else{
      this.mailError = false;
    }
    this.mailValue = value
  }

  doLogin(){
    let data = {
      'name': this.name,
      'password': this.password,
    }
    this.http.post('api/login', data).subscribe((data) => {
      if (data['isSucccess']){
        this.state.userId = data['info']['id']
        this.router.navigateByUrl('/shop');
      }
      else{
        this.error = true;
      }
    })
  }

}

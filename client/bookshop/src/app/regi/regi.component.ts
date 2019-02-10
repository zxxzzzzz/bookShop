import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-regi',
  templateUrl: './regi.component.html',
  styleUrls: ['./regi.component.css']
})
export class RegiComponent implements OnInit {

  mailError = false;
  mailValue = '';
  name = '';
  password = '';

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

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

  doRegi(){
    let data = {
      'name': this.name,
      'password': this.password,
      'mail': this.mailValue,
    }
    this.http.post('api/regi', data).subscribe((data) => {
      if (data['isSuccess']){
        this.router.navigateByUrl('/login')
      }
    })
  }


}

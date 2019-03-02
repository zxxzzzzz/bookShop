import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { StateService } from '../service/state.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

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
  errorMessage = ''
  

  constructor(
    private http:HttpClient, 
    private state:StateService, 
    private router:Router,
    private activeRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((param:ParamMap) => {
      let errorId = param.get('error');
      if (errorId === '1') {

      }
    })
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
        this.state.userId = data['info']['id'];
        this.state.password = data['info']['password'];
        this.state.name = data['info']['name'];
        this.state.role = data['info']['role']; // 1=normal 0=admin
        this.state.mail = data['info']['mail'];

        let isActive = data['info']['active'] //active unactive
        if (isActive === 'active') {
          // 账号已激活
          if (this.state.role === 1) { // 角色是用户
            this.router.navigateByUrl('/shop');
          }
          else if (this.state.role === 0) { // 角色是管理员
            this.router.navigateByUrl('/admin');
          }
          // 角色是管理员
        }
        else {
          // error = 1,代表账号未激活
          this.router.navigateByUrl('/login?error=1')
          this.error = true;
          this.errorMessage = '账号未激活,请去邮箱查看激活邮件（可能在垃圾邮件里）';
        }
      }
      else{
        this.error = true;
        this.errorMessage = '账号或密码错误';
      }
    })
  }

}

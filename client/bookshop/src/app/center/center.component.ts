import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from '../customCom/book/book.component'
import { StateService } from '../service/state.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  @ViewChild(BookComponent) books:BookComponent;

  name = '';
  address = '';
  message= '';
  sex = '';

  constructor(private state:StateService, private http:HttpClient) { }

  ngOnInit() {
    let userId = this.state.userId;
    
    let url = `/api/userInfo?userId=${userId}`
    this.http.get(url).subscribe((data:Array<any>) => {
      if(data.length > 0){
        data = data[0];
        this.address = data['address'];
        this.name = data['name'];
        this.message = data['message'];
        this.sex = data['sex'];
        this.books.showOrderBook(userId);
      }
    })
  }

  infoChange(){
    let userId = this.state.userId;
    let sex = this.sex;
    let name = this.name;
    let message = this.message;
    let address = this.address;
    let sendData = {
      'userId': userId,
      'sex': sex,
      'name': name,
      'message': message,
      'address': address
    }
    this.http.post('/api/userInfo',sendData).subscribe(() => {
      alert('更新成功');
    })
  }

}

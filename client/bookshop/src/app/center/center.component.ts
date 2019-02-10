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

  constructor(private state:StateService, private http:HttpClient) { }

  ngOnInit() {
    let userId = this.state.userId;
    
    let url = `/api/userInfo?userId=${userId}`
    this.http.get(url).subscribe((data) => {
      data = data[0];
      this.address = data['address'];
      this.name = data['name'];
      this.message = data['message'];
      this.books.showOrderBook(userId);
    })
  }

  infoChange(){
    
  }

}

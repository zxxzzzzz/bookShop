import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from '../../../customCom/book/book.component';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  @ViewChild(BookComponent) books:BookComponent;
  constructor() { }

  ngOnInit() {
    this.books.showOrderBook(-1);
  }

}

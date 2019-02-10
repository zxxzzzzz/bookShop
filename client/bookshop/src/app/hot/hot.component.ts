import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from '../customCom/book/book.component'

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css']
})
export class HotComponent implements OnInit {

  @ViewChild(BookComponent) books:BookComponent;

  constructor() { }

  ngOnInit() {
    this.books.showRecom();
  }

}

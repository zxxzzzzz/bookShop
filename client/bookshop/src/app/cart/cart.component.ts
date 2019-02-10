import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from '../customCom/book/book.component' 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild(BookComponent) books:BookComponent;
  constructor() { }

  ngOnInit() {
    this.books.showCartBook();
  }

}

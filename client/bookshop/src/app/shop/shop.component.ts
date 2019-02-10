import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from '../customCom/book/book.component' 

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  @ViewChild(BookComponent) books:BookComponent;

  constructor() { }

  ngOnInit() {
    this.books.searchBooks();
  }

  search(searchText){
    this.books.searchBooks(searchText, searchText, searchText, searchText);
  }

}

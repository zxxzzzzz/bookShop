import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-pan',
  templateUrl: './book-pan.component.html',
  styleUrls: ['./book-pan.component.css']
})
export class BookPanComponent implements OnInit {


  book:object = null;

  joinCartButton = false;
  deleteCartButton = false
  joinOrderButton = false;

  constructor() { }

  ngOnInit() {
  }

}

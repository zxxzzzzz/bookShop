import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from '../../../customCom/book/book.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit {
  @ViewChild(BookComponent) books:BookComponent;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.books.searchBooks();
  }

  jumpUrl(bookId){
    let url = `/admin/updateBook?bookId=${bookId}`
    this.router.navigateByUrl(url);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  // ngModel
  bookTitle = '';
  bookPress = '';
  bookPrice = '';
  bookPageCount = '';
  bookExtract = ''; 
  bookAuthor = '';
  bookImg = '';
  bookIntro = '';
  bookClass = '';
  bookStockCount = '';

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  AddBook(){
    let sendData= {
      'title': this.bookTitle,
      'press': this.bookPress, 
      'price' : this.bookPrice,
      'pageCount' : this.bookPageCount ,
      'extract': this.bookExtract,
      'author': this.bookAuthor,
      'img': this.bookImg,
      'intro': this.bookIntro,
      'class': this.bookClass,
      'stockCount': this.bookStockCount,
    }
    this.http.post(
      'api/book',
      sendData
    ).subscribe((data) => {
      alert('添加成功');
    })
  }

}

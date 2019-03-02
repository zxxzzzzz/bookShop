import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {


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
  
  bookId = '';



  constructor(
    private http:HttpClient,
    private activeRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((param:ParamMap) => {
      let bookId = param.get('bookId')
      this.bookId = bookId;
      this.http.get(
        `api/search?bookId=${bookId}`
      ).subscribe((data) => {
        let elem = data[0];
        this.bookAuthor = elem['author'];
        this.bookClass = elem['class'];
        this.bookExtract = elem['extract'];
        this.bookImg = elem['img'];
        this.bookIntro = elem['introduction']
        this.bookPageCount = elem['pageCount']
        this.bookPress = elem['press']
        this.bookPrice = elem['price']
        this.bookTitle = elem['title']
        this.bookStockCount = elem['stockCount']
      })
    })
  }

  updateBook(){
    let sendData= {
      'id': this.bookId,
      'title': this.bookTitle,
      'press': this.bookPress, 
      'price' : this.bookPrice,
      'pageCount' : this.bookPageCount ,
      'extract': this.bookExtract,
      'author': this.bookAuthor,
      'img': this.bookImg,
      'intro': this.bookIntro,
      'class': this.bookClass,
      'stockCount': this.bookStockCount
    }
    this.http.post(
      'api/book/update',
      sendData
    ).subscribe((data) => {
      alert('更新成功');
    })
  }

}

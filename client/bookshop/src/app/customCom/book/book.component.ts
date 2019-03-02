import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { StateService } from '../../service/state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book1s = [];
  book2s = [];
  book3s = [];

  @Input() joinCartButton = false;
  @Input() deleteCartButton = false;
  @Input() joinOrderButton = false;
  @Input() sendGoodsButton = false;
  @Input() receiveGoodsButton = false;
  @Input() sendCommentButton = false;
  @Input() jumpUrl = null;


  // ngmodel
  commentContent = '';

  constructor(
    private http:HttpClient,
    private state:StateService,
    private router:Router
  ) { }



  ngOnInit() {
  }

  addCart(bookId){
    let userId = this.state.userId
    let data = {
      'userId': userId,
      'bookId': bookId
    }
    this.http.post('/api/cart', data).subscribe(() => {

    })
  }

  delCart(cartId){
    let data = {
      'id': cartId,
    }
    this.http.post('api/cash', data).subscribe(() => {
      this.showCartBook();
    })
  }

  addOrder(idStr:string){
    console.log(idStr)
    let bookId = parseInt(idStr.split(';')[0])
    let cartId = parseInt(idStr.split(';')[1])
    let userId = this.state.userId
    let data = {
      'userId': userId,
      'bookId': bookId,
      'cartId': cartId,
    }
    this.http.post('/api/order', data).subscribe(() => {
      this.showCartBook();
    })
  }

  jumpDetail(bookId){
    if(this.jumpUrl === null){
      let url = `/detail?bookId=${bookId}`
      this.router.navigateByUrl(url)
    }
    else {
      if(typeof this.jumpUrl === 'function') {
        this.jumpUrl(bookId)
      }
    }
  }

  showHot(){
    let url = `/api/hot`
    this.http.get(url).subscribe((data:Array<object>)=>{
      this.book1s = []
      this.book2s = []
      this.book3s = []

      let len = data.length;
      if (len === 1){
        this.book1s = data;
      }
      if (len === 2){
        this.book1s = data.slice(0, 1);
        this.book2s = data.slice(1, 2);
      }
      if (len >= 3){
        let count = Math.floor(len / 3)
        let remain = len - count*3
        this.book1s = data.slice(0, count)
        this.book2s = data.slice(count, count*2)
        this.book3s = data.slice(count*2, count*3)
        for (let index = 0; index < remain; index++) {
          const element = data.slice(count * 3 + index, count * 3 + index + 1)[0];
          if(index%3 === 0){
            this.book1s.push(element)
          }
          if(index%3 === 1){
            this.book2s.push(element)
          }
          if(index%3 === 2){
            this.book3s.push(element)
          }
        }
      }
    })
  }

  showOrderBook(userId){
    let url = `api/order?userId=${userId}`;
    this.http.get(url).subscribe((data:Array<object>) => {
      this.book1s = []
      this.book2s = []
      this.book3s = []

      let len = data.length;
      if (len === 1){
        this.book1s = data;
      }
      if (len === 2){
        this.book1s = data.slice(0, 1);
        this.book2s = data.slice(1, 2);
      }
      if (len >= 3){
        let count = Math.floor(len / 3)
        let remain = len - count*3
        this.book1s = data.slice(0, count)
        this.book2s = data.slice(count, count*2)
        this.book3s = data.slice(count*2, count*3)
        for (let index = 0; index < remain; index++) {
          const element = data.slice(count * 3 + index, count * 3 + index + 1)[0];
          if(index%3 === 0){
            this.book1s.push(element)
          }
          if(index%3 === 1){
            this.book2s.push(element)
          }
          if(index%3 === 2){
            this.book3s.push(element)
          }
        }
      }
    })
  }


  showCartBook(){
    let userId = this.state.userId;
    let url = `/api/cart?userId=${userId}`;
    this.http.get(url).subscribe((data:Array<object>) => {
      this.book1s = []
      this.book2s = []
      this.book3s = []

      let len = data.length;
      if (len === 1){
        this.book1s = data;
      }
      if (len === 2){
        this.book1s = data.slice(0, 1);
        this.book2s = data.slice(1, 2);
      }
      if (len >= 3){
        let count = Math.floor(len / 3)
        let remain = len - count*3
        this.book1s = data.slice(0, count)
        this.book2s = data.slice(count, count*2)
        this.book3s = data.slice(count*2, count*3)
        for (let index = 0; index < remain; index++) {
          const element = data.slice(count * 3 + index, count * 3 + index + 1)[0];
          if(index%3 === 0){
            this.book1s.push(element)
          }
          if(index%3 === 1){
            this.book2s.push(element)
          }
          if(index%3 === 2){
            this.book3s.push(element)
          }
        }
      }
    })
  }

  showRecom(){
    let userId = this.state.userId;
    let url = `/api/recom?userId=${userId}`
    this.http.get(url).subscribe((data:Array<object>)=>{
      this.book1s = []
      this.book2s = []
      this.book3s = []

      let len = data.length;
      if (len === 1){
        this.book1s = data;
      }
      if (len === 2){
        this.book1s = data.slice(0, 1);
        this.book2s = data.slice(1, 2);
      }
      if (len >= 3){
        let count = Math.floor(len / 3)
        let remain = len - count*3
        this.book1s = data.slice(0, count)
        this.book2s = data.slice(count, count*2)
        this.book3s = data.slice(count*2, count*3)
        for (let index = 0; index < remain; index++) {
          const element = data.slice(count * 3 + index, count * 3 + index + 1)[0];
          if(index%3 === 0){
            this.book1s.push(element)
          }
          if(index%3 === 1){
            this.book2s.push(element)
          }
          if(index%3 === 2){
            this.book3s.push(element)
          }
        }
      }
    })
  }


  searchBooks(title='', author='', press='', bookClass=''){
    let url = '/api/search?'
    let titleurl = ''
    let authorurl = ''
    let pressurl = ''
    let bookClassurl = ''
    if(title != ''){
      titleurl = `title=${title}&`
    }
    if(author != ''){
      authorurl = `author=${author}&`
    }
    if(press != ''){
      pressurl = `press=${press}&`
    }
    if(bookClass != ''){
      bookClassurl = `bookClass=${bookClass}`
    }
    url = `${url}${titleurl}${authorurl}${pressurl}${bookClassurl}`;
    this.http.get(url).subscribe((data:Array<object>)=>{

      this.book1s = []
      this.book2s = []
      this.book3s = []

      let len = data.length;
      if (len === 1){
        this.book1s = data;
      }
      if (len === 2){
        this.book1s = data.slice(0, 1);
        this.book2s = data.slice(1, 2);
      }
      if (len >= 3){
        let count = Math.floor(len / 3)
        let remain = len - count*3
        this.book1s = data.slice(0, count)
        this.book2s = data.slice(count, count*2)
        this.book3s = data.slice(count*2, count*3)
        for (let index = 0; index < remain; index++) {
          const element = data.slice(count * 3 + index, count * 3 + index + 1)[0];
          if(index%3 === 0){
            this.book1s.push(element)
          }
          if(index%3 === 1){
            this.book2s.push(element)
          }
          if(index%3 === 2){
            this.book3s.push(element)
          }
        }
      }
    })
  }

  sendGoods(idStr){
    let bookId = parseInt(idStr.split(';')[0])
    let orderId = parseInt(idStr.split(';')[1])
    this.http.post(
      '/api/order/update',
      {
        'orderId': orderId,
        'state': '已发货'
      }
    ).subscribe(() => {
      this.showOrderBook(-1)
    })
  }

  receiveGoods(idStr){
    let userId = this.state.userId;
    let bookId = parseInt(idStr.split(';')[0])
    let orderId = parseInt(idStr.split(';')[1])
    this.http.post(
      '/api/order/update',
      {
        'orderId': orderId,
        'state': '已收货'
      }
    ).subscribe(() => {
      this.showOrderBook(userId)
    })
  }

  sendComment(idStr){
    let userId = this.state.userId;
    let bookId = parseInt(idStr.split(';')[0])
    let orderId = parseInt(idStr.split(';')[1])
    let comment = this.commentContent;
    this.http.post(
      '/api/order/update',
      {
        'orderId': orderId,
        'state': '已评价'
      }
    ).subscribe(() => {
      this.showOrderBook(userId)
      this.http.post(
        '/api/comment',
        {
          'userId':userId,
          'bookId':bookId,
          'content':comment,
        }
      ).subscribe(() => {
        
      })
    })
  }

}

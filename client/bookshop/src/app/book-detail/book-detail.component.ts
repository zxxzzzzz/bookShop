import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  title = '';
  press = '';
  author = '';
  comments:Array<object> = [];
  extract = '';

  constructor(private http:HttpClient, private activeRouter:ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.queryParamMap.subscribe((param:ParamMap) => {
      let id = param.get('bookId');
      let url = `api/search?bookId=${id}`
      this.http.get(url).subscribe((data) => {
        data = data[0];
        this.title = data['title'];
        this.author = data['author'];
        this.press = data['press'];
        let url = `api/comment?bookId=${id}`
        this.http.get(url).subscribe((data:Array<object>) => {
          this.comments = data;
          let url = `api/read?bookId=${id}`
          this.http.get(url).subscribe((data)=> {
            this.extract = data['content'];
          })
        })
      })
    })
  }

}

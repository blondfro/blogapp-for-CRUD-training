import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Article } from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {

  result: any;
  constructor( private http: Http) { }

  getArticles() {
    return this.http.get('/api/all')
      .map(result => this.result = result.json());
  }

  getArticle(id) {
    return this.http.get('/api/articles/' + id)
      .map(result => this.result = result.json());
  }

  insertArticle(post: Article) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post('/api/create', JSON.stringify(post), options)
      .map(result => this.result = result.json());
  }

}

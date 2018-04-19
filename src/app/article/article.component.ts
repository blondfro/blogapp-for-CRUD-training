import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service';
import {Article} from '../article';

import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Array<Article>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];

      this.articleService.getArticle(id)
        .subscribe(res => this.article = res);
    });
  }

}

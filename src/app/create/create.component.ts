import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service';
import {Article} from '../article';

import { Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  articleForm: FormGroup;
  articles: Array<Article>;
  article: Article;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.articleService.getArticles()
      .subscribe(res => this.articles = res);

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.articleService.getArticle(params['id'])
          .subscribe(res => {
            this.article = res;

            this.articleForm = this.formBuilder.group({
              'title': [this.article['title'], Validators.compose([Validators.required,
                Validators.minLength(10), Validators.maxLength(45)])],
              'content': [this.article['content'], Validators.compose([Validators.required,
                Validators.minLength(10)])]
            });
          });
      } else {
        this.articleForm = this.formBuilder.group({
          'title': [null, Validators.compose([Validators.required,
            Validators.minLength(10), Validators.maxLength(45)])],
          'content': [null, Validators.compose([Validators.required,
            Validators.minLength(10)])]
        });
      }
    });


  }

  addArticle(articleId, article: Article) {

    if (articleId != undefined) {
      this.articleService.updateArticle(article, articleId._id)
        .subscribe(updateArticle => {
          this.router.navigateByUrl('/');
        });
    } else {
        this.articleService.insertArticle(article)
          .subscribe(newArticle => {
            this.articles.push(newArticle);
            this.router.navigateByUrl('/');
          });
    }
  }

}

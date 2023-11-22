import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { INewsItem } from 'src/app/features/news-feed/models/INewsItem';
import { Post } from '../models/post.model';
import { Blog } from '../models/blog.model';
import { Poll } from '../models/poll.model';
import { PeopleService } from './people.service';

import { LoremIpsum } from 'lorem-ipsum';
import { IList } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService implements IList {

  private id: number = 0;
  private delay: number = 3000;
  private lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  private peopleService: PeopleService = inject(PeopleService);

  public newsItems: INewsItem[] = [
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem(),
    this.generateRandomNewsItem()
  ];

  constructor() {
  }

  get(id: string | null, delay: number = this.delay): Observable<INewsItem> {
    let response: INewsItem;

    for(let i = 0; i < this.newsItems.length; i++) {
      if (this.newsItems[i].id == id) {
        response = this.newsItems[i];
        break;
      }
    }

    let observable: Observable<INewsItem> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  getMany(count: number = 10, delay: number = 5000): Observable<INewsItem[]> {
    let observable: Observable<INewsItem[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.newsItems.slice(0, count > this.newsItems.length ? this.newsItems.length : count));
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  private generateRandomNewsItem(): INewsItem {

    let newsItem: INewsItem = <INewsItem> {};

    switch(Math.floor(Math.random() * 3)) {
      case 0:
        newsItem  = new Post(
          this.id.toString(),
          this.peopleService.people[this.id],
          new Date(),
          this.randomContent(),
          Math.floor(Math.random() * 199) + 1,
          Math.floor(Math.random() * 99) + 1
        );
        break;
      case 1:
        newsItem  = new Blog(
          this.id.toString(),
          this.peopleService.people[this.id],
          new Date(),
          this.randomContent(),
          Math.floor(Math.random() * 199) + 1,
          Math.floor(Math.random() * 99) + 1
        );
        break;
      case 2:
        newsItem  = new Poll(
          this.id.toString(),
          this.peopleService.people[this.id],
          new Date(),
          this.randomContent(),
          Math.floor(Math.random() * 199) + 1,
          Math.floor(Math.random() * 99) + 1
        );
        break;
    }

    this.id++;

    return newsItem;
  }

  private randomContent(): string {
    let content: string = '';
    let paragraphs = (Math.random() * 4) + 1;

    for (let i = 0; i < paragraphs; i++) {
      content += this.lorem.generateSentences(Math.floor(Math.random() * 10) + 4);

      if (i != paragraphs - 1)
      content += '<br/><br/>';
    }

    return content;
  }
}

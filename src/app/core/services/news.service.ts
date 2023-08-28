//import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from 'src/app/features/news-feed/models/news-item';
import { PeopleService } from './people.service';

import { LoremIpsum } from 'lorem-ipsum';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

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

  public newsItems: NewsItem[] = [
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

  mockGetNewsItem(id: string | null, delay: number = this.delay): Observable<NewsItem> {
    let response: NewsItem;

    for(let i = 0; i < this.newsItems.length; i++) {
      if (this.newsItems[i].id == id) {
        response = this.newsItems[i];
        break;
      }
    }

    let observable: Observable<NewsItem> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  mockGetNewsItems(count: number = 10, delay: number = 5000): Observable<NewsItem[]> {
    let observable: Observable<NewsItem[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.newsItems.slice(0, count > this.newsItems.length ? this.newsItems.length : count));
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  private generateRandomNewsItem(): NewsItem {
    const newsItem = new NewsItem();

    newsItem.id = this.id.toString();
    newsItem.date = new Date();
    newsItem.content = this.randomContent();
    newsItem.comments = Math.floor(Math.random() * 199) + 1;
    newsItem.likes = Math.floor(Math.random() * 99) + 1;
    newsItem.author = this.peopleService.people[this.id];

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

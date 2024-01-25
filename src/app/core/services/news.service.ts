//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from 'src/app/features/news-feed/models/news-item';
import { Person } from '../models/person';
import { PeopleService } from './people.service';

import { LoremIpsum } from 'lorem-ipsum';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private id: number = 0;
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
  private peopleService: PeopleService;

  constructor(peopleService: PeopleService) {
    this.peopleService = peopleService;
  }

  mockGetNewsItems(count: number = 10, delay: number = 5000): Observable<NewsItem[]> {
    let response: NewsItem[] = [];

    for(let i = 0; i < count; i++) {
      response.push(this.generateRandomNewsItem());
    }

    let observable: Observable<NewsItem[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  private generateRandomNewsItem(): NewsItem {
    const newsItem = new NewsItem();

    newsItem.id = this.id.toString();
    newsItem.date = new Date();
    newsItem.content = this.lorem.generateParagraphs(Math.floor(Math.random() * 2) + 1);
    newsItem.comments = Math.floor(Math.random() * 199) + 1;
    newsItem.likes = Math.floor(Math.random() * 99) + 1;

    this.peopleService.mockGetPeople(1, 0).subscribe((person) => {
      newsItem.author = person[0];
    });

    this.id++;

    return newsItem;
  }
}

//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from 'src/app/features/news-feed/models/news-item';
import { Person } from '../models/person';

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

  constructor() {

  }

  getNews(page: number): Observable<NewsItem[]> {
    return this.mockGetNewsItems(page);
  }

  private mockGetNewsItems(page: number): Observable<NewsItem[]> {
    let response: NewsItem[] = [];

    for(let i = 0; i < 10; i++) {
      response.push(this.generateRandomNewsItem());
    }

    let observable: Observable<NewsItem[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 5000);
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

    const author = new Person();

    author.id = this.id.toString();
    author.firstName = this.randomFirstName();
    author.lastName = this.randomLastName();
    author.jobTitle = this.randomJobTitle();

    newsItem.author = author;
    this.id++;

    return newsItem;
  }

  private randomFirstName(): string {
    const names: string[] = [
      'Jack',
      'Jill',
      'Bo',
      'Henry',
      'Samantha',
      'Nick',
      'Fabrizio',
      'Charles',
      'Enzo',
      'Robert',
      'Allisa'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  private randomLastName(): string {
    const names: string[] = [
      'Rose',
      'Baker',
      'McDoogle',
      'FancyPants',
      'Campbell',
      'Smith',
      'Anderson',
      'Miller',
      'Taylor',
      'Jones'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  private randomJobTitle(): string {
    const titles: string[] = [
      'Beer Taste Tester',
      'Snake Oil Salesman',
      'Meeting Scheduler',
      'People Pleaser',
      'Cat Herder',
      'VP of Office Gossip',
      'Water Cooler Technician',
      'Freelance Proctologist',
      'Assistant to the Regional Manager'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }
}

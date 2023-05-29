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
    author.profilePicture = this.randomProfilePic();

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

  private randomProfilePic(): string {
    const urls: string[] = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmvC2Gzy3zrH0V97WubkgHZ7WnILp-l9WrcdeNNKSPP0GZ5Kv0rcHIII5Z_UEmFjkcUPw&usqp=CAU',
      'https://i.pinimg.com/originals/fe/a0/b4/fea0b4eca9a774e2f76952d4d443ba73.jpg',
      'https://static.boredpanda.com/blog/wp-content/uploads/2021/07/CLml70UpO26-png__700.jpg',
      'https://wallpapers-clan.com/wp-content/uploads/2022/08/funny-dog-pfp-1.jpg',
      'https://i.redd.it/k4ckbuiugmfz.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGDbcW5mkzZH9Mb-azwbvYedTer6phmPlXg&usqp=CAU',
      'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Funny-Dog-PFP-profile-300x300.jpg',
      'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVubnklMjBhbmltYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://i.pinimg.com/originals/31/a0/d5/31a0d596f1e215b5825333f419645dcb.jpg',
      'https://static.photocdn.pt/images/apple/71animalfaces/animalfaces25.webp'
    ];
    return urls[Math.floor(Math.random() * urls.length)];
  }
}

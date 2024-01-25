import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private id: number = 0;

  constructor() { }

  mockGetPeople(count: number = 10, delay: number = 3000): Observable<Person[]> {
    let response: Person[] = [];

    for (let i = 0; i < count; i++) {
      response.push(this.generateRandomPerson());
    }

    let observable: Observable<Person[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  private generateRandomPerson(): Person {
    const person = new Person();

    person.id = this.id.toString();
    person.firstName = this.randomFirstName();
    person.lastName = this.randomLastName();
    person.jobTitle = this.randomJobTitle();
    person.profilePicture = this.randomProfilePic();

    this.id++;
    
    return person;
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

import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';
import { IListService } from '../interfaces/list-service.interface';
import { ProfileCardComponent } from 'src/app/features/profile/components/profile-card/profile-card.component';

@Injectable({
  providedIn: 'root',
})
export class PeopleService implements IListService {
  private id: number = 0;
  private delay: number = 3000;

  public people: Person[] = [
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
    this.generateRandomPerson(),
  ];

  public dataType = Person;
  public cardComponent = ProfileCardComponent;

  constructor() {}

  get(id: string | null, delay: number = this.delay): Observable<Person> {
    let response: Person;

    for (let i = 0; i < this.people.length; i++) {
      if (this.people[i].id == id) {
        response = this.people[i];
        break;
      }
    }

    const observable: Observable<Person> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  getMany(
    count: number = 10,
    delay: number = this.delay,
  ): Observable<Person[]> {
    const observable: Observable<Person[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(
          this.people.slice(
            0,
            count > this.people.length ? this.people.length : count,
          ),
        );
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  private generateRandomPerson(): Person {
    const person = new Person(
      this.id.toString(),
      this.randomFirstName(),
      this.randomLastName(),
      this.randomJobTitle(),
      this.randomAddress(),
      this.randomProfilePic(),
    );
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
      'Allisa',
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
      'Jones',
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
      'Assistant to the Regional Manager',
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
      'https://static.photocdn.pt/images/apple/71animalfaces/animalfaces25.webp',
    ];
    return urls[Math.floor(Math.random() * urls.length)];
  }

  private randomAddress(): Location {
    const addresses: Location[] = [
      new Location('2910 Woodroffe Ave', 'Ottawa', 'Ontario'),
      new Location('4230 Innes Rd', 'Ottawa', 'Ontario'),
      new Location('2440 Bank St', 'Ottawa', 'Ontario'),
      new Location('464 Rideau St', 'Ottawa', 'Ontario'),
      new Location('464 Bank St', 'Ottawa', 'Ontario'),
    ];
    return addresses[Math.floor(Math.random() * addresses.length)];
  }
}

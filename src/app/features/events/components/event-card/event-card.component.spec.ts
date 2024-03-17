import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardComponent } from './event-card.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';
import { Location } from 'src/app/core/models/location.model';
import { Person } from 'src/app/core/models/person.model';
import { Group } from 'src/app/features/groups/models/group';
import { Event } from '../../models/event';

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCardComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
      ],
      providers: [TranslateService, HttpClient],
    });
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    const event = new Event();
    component.model = {
      id: '0',
      title: 'Test Event',
      eventType: 'Hybrid',
      description: 'Test Event Description',
      location: new Location('123 Main St.', 'Ottawa', 'Ontario'),
      language: 'English',
      tags: [''],
      startDate: new Date(),
      endDate: new Date(),
      author: new Person('0', 'Shea', 'Dougherty-Gill', 'Web Developer', new Location('123 Main St.', 'Ottawa', 'Ontario')),
      authoredDate: new Date(),
      canceled: false,
      image: '../assets/image/group-banner.png',
      group: new Group('0', 'Test Group', '../assets/image/group-banner.png'),
      displayPicture: '../assets/image/group-banner.png',
      organizer: 'Test Organizer',
      onlinePlatform: 'Teams',
      duration: 'Single',
      confirmed: false,
      declined: false,
      toEventForm: event.toEventForm,
      fromEventForm: event.fromEventForm
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

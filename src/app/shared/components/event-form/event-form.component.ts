import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() model: IEventForm = {
    eventType: 'Hybrid',
    eventOrganizerName: '',
    eventName: '',
    eventLanguage: 'Bilingual',
    eventDescription: '',
    eventLocation: '',
    eventOnlinePlatform: '',
    eventDuration: '',
    eventStartDate: '',
    eventEndDate: ''
  }

  eventType = EventType;
  eventLanguage = EventLanguage;
  eventDuration = EventDuration;
  errorStateMatcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    if (Object.keys(this.form.controls).length === 0) {
      for (const [key, value] of Object.entries(this.model)) {
        this.form.addControl(key, new FormControl(value, [Validators.required]));
      }
    }
  }

  ngAfterContentInit(): void {
    this.onEventTypeChange();
    this.onEventDurationChange();
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  onEventTypeChange(): void {
    switch (this.model.eventType) {
      case EventType.InPerson:
        this.form.controls['eventOnlinePlatform'].removeValidators(Validators.required);
        this.form.controls['eventOnlinePlatform'].clearValidators();
        this.form.controls['eventOnlinePlatform'].updateValueAndValidity();
        this.form.controls['eventLocation'].addValidators(Validators.required);
        this.form.controls['eventLocation'].clearValidators();
        this.form.controls['eventLocation'].updateValueAndValidity()
        break;
      case EventType.Online:
        this.form.controls['eventLocation'].removeValidators(Validators.required);
        this.form.controls['eventLocation'].updateValueAndValidity()
        this.form.controls['eventOnlinePlatform'].addValidators(Validators.required);
        this.form.controls['eventOnlinePlatform'].clearValidators();
        this.form.controls['eventOnlinePlatform'].updateValueAndValidity();
        break;
      case EventType.Hybrid:
        this.form.controls['eventLocation'].addValidators(Validators.required);
        this.form.controls['eventLocation'].clearValidators();
        this.form.controls['eventLocation'].updateValueAndValidity()
        this.form.controls['eventOnlinePlatform'].addValidators(Validators.required);
        this.form.controls['eventOnlinePlatform'].clearValidators();
        this.form.controls['eventOnlinePlatform'].updateValueAndValidity();
        break;
    }
  }

  onEventDurationChange(): void {
    switch (this.model.eventDuration) {
      case EventDuration.Single:
        this.form.controls['eventEndDate'].removeValidators(Validators.required);
        this.form.controls['eventEndDate'].clearValidators();
        this.form.controls['eventEndDate'].updateValueAndValidity();
        break;
      case EventDuration.Multi:
        this.form.controls['eventEndDate'].addValidators(Validators.required);
        this.form.controls['eventEndDate'].clearValidators();
        this.form.controls['eventEndDate'].updateValueAndValidity();
        break;
    }
  }
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface IEventForm {
  eventType: EventType | string,
  eventOrganizerName: string,
  eventName: string,
  eventLanguage: EventLanguage | string,
  eventDescription: string,
  eventLocation: string,
  eventOnlinePlatform: string,
  eventDuration: EventDuration | string,
  eventStartDate: string,
  eventEndDate: string
}

enum EventType {
  InPerson = "In Person",
  Hybrid = "Hybrid",
  Online = "Online"
}

enum EventDuration {
  Single = "Single",
  Multi = "Multi"
}

enum EventLanguage {
  English = "English",
  French = "French",
  Bilingual = "Bilingual"
}

// IN PERSON
// Name of Organizer
// Name of Event
// Language of Event
// Event Description
// Location
// One/Multi Day event
//  One Day: Start Date/Time
//  Multi: Start & End Date/Time

// HYBRID
// Same as in person
// Add Online Streaming Platform link

// ONLINE
// Same as in person
// Remove location
// Replace with Online Streaming Platform link

//     id: string | undefined;
//     title: string | undefined;
//     eventType: string | undefined;
//     description: string | undefined;
//     location: Location | undefined;
//     tags: [string] | undefined;
//     startDate: Date | undefined;
//     endDate: Date | undefined;
//     author: Person | undefined;
//     authoredDate: Date | undefined;
//     canceled: boolean = false;
//     image: string | undefined;
//     group: Group | undefined;
    
//     confirmed: boolean = false;
//     declined: boolean = false;
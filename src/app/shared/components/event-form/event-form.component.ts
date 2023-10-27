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
    eventType: '',
    eventOrganizerName: '',
    eventName: '',
    eventLanguage: '',
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
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key])
        this.form.addControl(key, new FormControl(value, [Validators.required]));
      else
        console.warn('Duplicate FormControl detected.');
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
        this.form.controls['eventLocation'].clearValidators();
        this.form.controls['eventLocation'].updateValueAndValidity();

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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { Validators as EditorValidators } from 'ngx-editor';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() model: IEventForm = {
    eventType: EventType.Hybrid,
    eventOrganizerName: '',
    eventName: '',
    eventLanguage: EventLanguage.Bilingual,
    eventDescription: '',
    eventLocation: '',
    eventOnlinePlatform: '',
    eventDuration: EventDuration.Single,
    eventStartDate: '',
    eventStartTime: '12:00',
    eventEndDate: '',
    eventEndTime: '13:00'
  }

  eventType = EventType;
  eventLanguage = EventLanguage;
  eventDuration = EventDuration;
  errorStateMatcher = new MyErrorStateMatcher();
  maxCharacters = 240;

  constructor(public translations: Translations) {

  }

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        if (key == 'eventDescription')
          this.form.addControl(key, new FormControl(value, [EditorValidators.required(), EditorValidators.maxLength(this.maxCharacters)]));
        else
          this.form.addControl(key, new FormControl(value, [Validators.required]));
      } else {
        this.form.controls[key].setValue(value);
        console.warn('Duplicate FormControl detected.');
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

        this.form.controls['eventEndTime'].removeValidators(Validators.required);
        this.form.controls['eventEndTime'].clearValidators();
        this.form.controls['eventEndTime'].updateValueAndValidity();
        break;

      case EventDuration.Multi:
        this.form.controls['eventEndDate'].addValidators(Validators.required);
        this.form.controls['eventEndDate'].clearValidators();
        this.form.controls['eventEndDate'].updateValueAndValidity();

        this.form.controls['eventEndTime'].addValidators(Validators.required);
        this.form.controls['eventEndTime'].clearValidators();
        this.form.controls['eventEndTime'].updateValueAndValidity();
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
  eventStartTime: string,
  eventEndDate: string
  eventEndTime: string
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

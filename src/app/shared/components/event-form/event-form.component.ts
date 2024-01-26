import {
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { Validators as EditorValidators } from 'ngx-editor';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit, OnDestroy, AfterContentInit {
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
    eventEndTime: '13:00',
  };

  eventType = EventType;
  eventLanguage = EventLanguage;
  eventDuration = EventDuration;
  maxCharacters = 240;

  private minValidator = Validators.minLength(3);
  private maxValidator = Validators.maxLength(30);

  constructor(public translations: Translations) {}

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        if (key == 'eventDescription')
          this.form.addControl(
            key,
            new FormControl(value, [
              EditorValidators.required(),
              EditorValidators.maxLength(this.maxCharacters),
            ]),
          );
        else
          this.form.addControl(
            key,
            new FormControl(value, [
              Validators.required,
              this.minValidator,
              this.maxValidator,
            ]),
          );
      } else {
        this.form.controls[key].setValue(value);
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
        this.removeValidators('eventOnlinePlatform');
        this.addValidators('eventLocation');
        break;

      case EventType.Online:
        this.removeValidators('eventLocation');
        this.addValidators('eventOnlinePlatform');
        break;

      case EventType.Hybrid:
        this.addValidators('eventLocation');
        this.addValidators('eventOnlinePlatform');
        break;
    }
  }

  onEventDurationChange(): void {
    switch (this.model.eventDuration) {
      case EventDuration.Single:
        this.removeValidators('eventEndDate');
        this.removeValidators('eventEndTime');
        break;

      case EventDuration.Multi:
        this.addValidators('eventEndDate');
        this.addValidators('eventEndTime');
        break;
    }
  }

  private removeValidators(controlName: string): void {
    this.form.controls[controlName]?.removeValidators([
      Validators.required,
      this.minValidator,
      this.maxValidator,
    ]);
    this.form.controls[controlName]?.clearValidators();
    this.form.controls[controlName]?.updateValueAndValidity();
  }

  private addValidators(controlName: string): void {
    this.form.controls[controlName]?.addValidators([
      Validators.required,
      this.minValidator,
      this.maxValidator,
    ]);
    this.form.controls[controlName]?.clearValidators();
    this.form.controls[controlName]?.updateValueAndValidity();
  }
}

export interface IEventForm {
  eventType: EventType | string;
  eventOrganizerName: string;
  eventName: string;
  eventLanguage: EventLanguage | string;
  eventDescription: string;
  eventLocation: string;
  eventOnlinePlatform: string;
  eventDuration: EventDuration | string;
  eventStartDate: string;
  eventStartTime: string;
  eventEndDate: string;
  eventEndTime: string;
}

enum EventType {
  InPerson = 'In Person',
  Hybrid = 'Hybrid',
  Online = 'Online',
}

enum EventDuration {
  Single = 'Single',
  Multi = 'Multi',
}

enum EventLanguage {
  English = 'English',
  French = 'French',
  Bilingual = 'Bilingual',
}

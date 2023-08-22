import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';

import { Banner } from 'src/app/shared/components/banner/banner.component';
import { Event } from '../../models/event';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent {

  model: Event | undefined;
  banner: Banner | undefined;
  loading: boolean = false;
  bookmarked: boolean = false;

  materialButtonType = MaterialButtonType;

  constructor(public translations: Translations) {
    this.banner = new Banner('https://s3-alpha-sig.figma.com/img/9986/772c/bad4dde06cf83ed41c61df1b17d1369a?Expires=1693785600&Signature=Mk0vcKtlQGC1NfcH0dBlpdPH-i5JMQSjJHiBxsVivkz6XbUMgo5Ul~T1ZUsd5gqSdBNfzmzp7lkO9qpVNlO8-A4GndxqBMpov3x3qwhzV1XJobTN40viIEkOjMwF~jMFLjFRL7Ya2zrsBOKmct95k6QiyVuzvgVkm3o6bcjRNM7DuWnMFbju73L4Y-qDphKeglfi83dYbf3qO074PUnB3ReGXGChQ23~NiykgTz8UDu4oszh09nTKlnPhi8ZxuBckc6W8CsIUbsjaaTP6p0lcukyKa49lGjB9aFJ~xvpf38YI3ssl6rLlpWP1ILo6HvmQQAF7wdZvhPH1edpaeWecw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4');

    this.model = new Event();
    this.model.startDate = new Date('2024 04 27');
  }

  isPast(): boolean {
    if (this.model?.startDate && this.model.startDate < new Date()) 
      return true;
    
    return false;
  }
}

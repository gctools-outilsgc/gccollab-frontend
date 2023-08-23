import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';

import { Banner } from 'src/app/shared/components/banner/banner.component';
import { Event } from '../../models/event';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { Location } from 'src/app/core/models/location';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';

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
  tooltipDirection = TooltipDirection;

  constructor(public translations: Translations) {
    this.banner = new Banner('https://s3-alpha-sig.figma.com/img/9986/772c/bad4dde06cf83ed41c61df1b17d1369a?Expires=1693785600&Signature=Mk0vcKtlQGC1NfcH0dBlpdPH-i5JMQSjJHiBxsVivkz6XbUMgo5Ul~T1ZUsd5gqSdBNfzmzp7lkO9qpVNlO8-A4GndxqBMpov3x3qwhzV1XJobTN40viIEkOjMwF~jMFLjFRL7Ya2zrsBOKmct95k6QiyVuzvgVkm3o6bcjRNM7DuWnMFbju73L4Y-qDphKeglfi83dYbf3qO074PUnB3ReGXGChQ23~NiykgTz8UDu4oszh09nTKlnPhi8ZxuBckc6W8CsIUbsjaaTP6p0lcukyKa49lGjB9aFJ~xvpf38YI3ssl6rLlpWP1ILo6HvmQQAF7wdZvhPH1edpaeWecw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4');

    this.model = new Event();
    this.model.title = "GC Data Conference/Conférence sur les données du GC";
    this.model.description = "The annual GC Data Conference, now in its seventh year, serves as the primary forum for public servants and data leaders to share awareness in order to advance Canada's commitments to provide higher-quality data, insights and services to all.<br />With a theme centred on \"Leveraging Data to Advance Innovation\", the GC Data Conference 2023 will explore key topics related to using data to expand innovative methods, integrating social and ethical practices, and enabling collective change. The event offers opportunities to exchange knowledge, engage in discussions and expand awareness of the opportunities and challenges around the use of data across the Government of Canada.<br />This event is delivered through a partnership between Innovation, Science and Economic Development Canada and the Canada School of Public Service, with the subject-matter support and expertise of the GC Data Community.<br/><h3>Event Program</h3>Le programme de la conférence et la liste complète des conférenciers et conférencières seront publiés sous peu.";
    this.model.location = new Location('90 Elgin Street', 'Ottawa', 'Ontario');
    this.model.startDate = new Date('2024 04 27 9:00');
    this.model.endDate = new Date('2024 04 27 17:00');
  }

  isPast(): boolean {
    if (this.model?.startDate && this.model.startDate < new Date()) 
      return true;
    
    return false;
  }
}

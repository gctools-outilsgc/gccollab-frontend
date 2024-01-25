import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { NewsItem } from '../../models/news-item';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardComponent {

  @Input() model?: NewsItem;
  @Input() loading: boolean = false;

  liked: boolean = false;
  bookmarked: boolean = false;

  materialButtonType = MaterialButtonType;

  constructor(public translations: Translations) {}
}

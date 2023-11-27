import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { INewsItem } from '../../models/INewsItem';
import { Translations } from 'src/app/core/services/translations.service';

import { Post } from 'src/app/core/models/post.model';
import { Blog } from 'src/app/core/models/blog.model';
import { Poll } from 'src/app/core/models/poll.model';
import { ICardComponent } from 'src/app/core/interfaces/card-component.interface';
import { CardSize } from 'src/app/shared/models/card-size';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardComponent implements ICardComponent {

  @Input() model?: INewsItem;
  @Input() cardSize: CardSize = CardSize.Large;
  @Input() loading: boolean = false;

  liked: boolean = false;
  bookmarked: boolean = false;

  materialButtonType = MaterialButtonType;

  constructor(public translations: Translations) {}

  isPost(instance: any): boolean {
    return instance instanceof Post
  }

  isBlog(instance: any): boolean {
    return instance instanceof Blog
  }

  isPoll(instance: any): boolean {
    return instance instanceof Poll
  }
}

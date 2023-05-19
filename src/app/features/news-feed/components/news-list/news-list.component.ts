import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NewsItem } from '../../models/news-item';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent {
  @Input() model?: NewsItem[];
  @Input() isLoading: boolean = false;

  // https://levelup.gitconnected.com/implementing-infinite-scrolling-using-angular-82c66f27e817
}

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
  @Input() loadingCount: number = 5;

  loadingItems: number[];

  constructor() {
    this.loadingItems = [];
    
    for (let i = 0; i < this.loadingCount; i++) {
      this.loadingItems.push(i);
    }
  }
}

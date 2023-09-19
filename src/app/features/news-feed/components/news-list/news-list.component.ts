import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { INewsItem } from '../../models/INewsItem';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent {
  @Input() model: INewsItem[] = [];
  @Input() isLoading: boolean = false;
  @Input() loadingCount: number = 3;

  loadingItems: number[];

  constructor() {
    this.loadingItems = [];
    
    for (let i = 0; i < this.loadingCount; i++) {
      this.loadingItems.push(i);
    }
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Group } from '../../models/group';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListComponent {
  @Input() model?: Group[];
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

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileListComponent {
  @Input() model?: Person[];
  @Input() isLoading: boolean = false;
  @Input() loadingCount: number = 3;

  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  loadingItems: number[];

  constructor() {
    this.loadingItems = [];

    for (let i = 0; i < this.loadingCount; i++) {
      this.loadingItems.push(i);
    }
  }

  confirmConnection(person: Person) {
    this.confirm.emit(person);
  }

  declineConnection(person: Person) {
    this.decline.emit(person);
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';

@Component({
  selector: 'app-calendar-button',
  templateUrl: './calendar-button.component.html',
  styleUrls: ['./calendar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarButtonComponent {

  @Input() model: Date | undefined;
  @Input() tooltip: string = '';
  @Input() aria: string = '';
  @Input() tooltipDirection: TooltipDirection = TooltipDirection.Above;
  @Input() canceled: boolean = false;
  @Input() loading: boolean = false;

  constructor(public translations: Translations) 
  {  }

  click() {

  }

  isPast(): boolean {
    if (this.model && this.model < new Date()) 
      return true;
    
    return false;
  }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ButtonType } from '../../models/button-type';
import { MaterialButtonType } from '../../models/material-button-type';
import { MaterialColor } from '../../models/material-color';
import { TooltipDirection } from '../../models/tooltip-direction';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  @Input() btnId: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() tooltip: string = '';
  @Input() tooltipDirection: TooltipDirection = TooltipDirection.Below;
  @Input() ariaLabel: string = '';
  @Input() type: ButtonType = ButtonType.Button;
  @Input() matButtonType: MaterialButtonType = MaterialButtonType.Raised;
  @Input() matColor: MaterialColor = MaterialColor.Primary; // TODO: Implement this so it defaults to primary contrast
  @Input() disabled: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() matIcon: string = '';
  @Input() fontSize: string = 'inherit';

  constructor() { }

  ngOnInit(): void {
  }

}

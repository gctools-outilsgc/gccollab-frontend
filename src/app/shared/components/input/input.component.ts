import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputType } from '../../models/input-type';
import { FormControl } from '@angular/forms';
import { MaterialButtonType } from '../../models/material-button-type';
import { Translations } from 'src/app/core/services/translations.service';
import { TranslateService } from '@ngx-translate/core';
import { TooltipDirection } from '../../models/tooltip-direction';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {

  @Input() type: InputType = InputType.Text;
  @Input() formControl!: FormControl;

  @Input() value: string = '';
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() hint!: string;
  @Input() errorMessage!: string;
  @Input() maxLength: number = 524288;
  @Input() minLength: number = 0;
  @Input() pattern!: string;

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() autofocus: boolean = false;

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  inputType = InputType;
  showPassword = false;
  showHint = false;

  constructor(public translations: Translations) 
  { }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowHint(): void {
    this.showHint = !this.showHint;
  }
}

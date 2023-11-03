import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { InputType } from '../../models/input-type';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaterialButtonType } from '../../models/material-button-type';
import { Translations } from 'src/app/core/services/translations.service';
import { TranslateService } from '@ngx-translate/core';
import { TooltipDirection } from '../../models/tooltip-direction';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input() inputId!: string;
  @Input({required:true}) name!: string;
  
  @Input() type: InputType | string = InputType.Text;
  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() errorMatcher!: ErrorStateMatcher;

  @Input() value!: string;
  @Input({required:true}) label!: string;
  @Input() placeholder!: string;
  @Input() hint!: string;
  @Input() icon!: string;

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() autofocus: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  inputType = InputType;
  showPassword = false;
  showHint = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(public translations: Translations) { 

  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange  = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(value:  string) {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowHint(): void {
    this.showHint = !this.showHint;
  }
}

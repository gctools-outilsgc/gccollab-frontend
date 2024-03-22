import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() model: ILocationForm = {
    address: '',
    postalCode: '',
    city: 'Ottawa',
    province: 'Ontario',
    country: 'Canada',
  };

  constructor(public translations: Translations) {}

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        if (key == 'postalCode') {
          this.form.addControl(key, new FormControl(value, [Validators.required, Validators.minLength(6), Validators.maxLength(7), this.postalCodeValidator()]));
        }
        else {
          this.form.addControl(key, new FormControl(value, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]));
        } 
      } else {
        this.form.controls[key].setValue(value);
      }
    }
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  private postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (control.value && !postalCodePattern.test(control.value)) {
        return { 'invalidPostalCode': true };
      }
      return null;
    };
  }
}

export interface ILocationForm {
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
}

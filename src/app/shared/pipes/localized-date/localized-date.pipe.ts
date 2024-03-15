import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: Date, pattern: string = 'mediumDate'): string | null {
    let datePipe: DatePipe | undefined;

    if (this.translateService.currentLang) {
      datePipe = new DatePipe(this.translateService.currentLang);
    }

    return datePipe != undefined ? datePipe.transform(value, pattern) : '';
  }
}

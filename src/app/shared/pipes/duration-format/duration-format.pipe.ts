import { Pipe, PipeTransform } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'durationFormat',
  pure: false
})
export class DurationFormatPipe implements PipeTransform {

    constructor(private translations: Translations, private translate : TranslateService) {}

    transform(startDate: Date, endDate: Date): string {
        if (!startDate || !endDate) {
        return '';
        }

        const duration = endDate.getTime() - startDate.getTime();
        const millisecondsInMinute = 60 * 1000;
        const millisecondsInHour = 60 * millisecondsInMinute;
        const millisecondsInDay = 24 * millisecondsInHour;
        const millisecondsInWeek = 7 * millisecondsInDay;
        const millisecondsInMonth = 30 * millisecondsInDay;

        let months = Math.floor(duration / millisecondsInMonth);
        let weeks = Math.floor((duration % millisecondsInMonth) / millisecondsInWeek);
        let days = Math.floor((duration % millisecondsInWeek) / millisecondsInDay);
        let hours = Math.floor((duration % millisecondsInDay) / millisecondsInHour);
        let minutes = Math.floor((duration % millisecondsInHour) / millisecondsInMinute);

        let result = '';

        if (months > 0) {
            result += months > 1 ? `${months} ${this.translate.instant(this.translations.duration.month.plural)}, ` : `${months} ${this.translate.instant(this.translations.duration.month.singular)}, `;
        }
        if (weeks > 0) {
            result += weeks > 1 ? `${weeks} ${this.translate.instant(this.translations.duration.week.plural)}, ` : `${weeks} ${this.translate.instant(this.translations.duration.week.singular)}, `;
        }
        if (days > 0) {
            result += days > 1 ? `${days} ${this.translate.instant(this.translations.duration.day.plural)}, ` : `${days} ${this.translate.instant(this.translations.duration.day.singular)}, `;
        }
        if (hours > 0) {
            result += hours > 1 ? `${hours} ${this.translate.instant(this.translations.duration.hour.plural)}, ` : `${hours} ${this.translate.instant(this.translations.duration.hour.singular)}, `;
        }
        if (minutes > 0) {
            result += minutes > 1 ? `${minutes} ${this.translate.instant(this.translations.duration.minute.plural)}, ` : `${minutes} ${this.translate.instant(this.translations.duration.minute.singular)}, `;
        }

        return result.trim().replace(/,([^,]*)$/, '$1');
  }
}
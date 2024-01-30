import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

interface TranslationData {
  [key: string]: string;
}

export class TypescriptLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private translationFile: string
  ) {}

  public getTranslation(lang: string): Observable<TranslationData> {
    const url = `./assets/i18n/${this.translationFile}.${lang}.ts`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        const obj = response.substring(response.indexOf('{'), response.lastIndexOf('}') + 1);
        const translations = eval(JSON.parse(obj));

        for (const [key, value] of Object.entries(translations.routes)) {
          translations.routes[key] = encodeURIComponent(`${value}`);
        }

        return translations.default || translations;
      })
    );
  }
}

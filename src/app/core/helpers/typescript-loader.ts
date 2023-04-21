import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

interface TranslationData {
  [key: string]: string;
}

export class TypescriptLoader implements TranslateLoader {
  constructor(private http: HttpClient, private translationFile: string) {}

  public getTranslation(lang: string): Observable<TranslationData> {
    const url = `./assets/i18n/${this.translationFile}.${lang}.ts`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        const translations = eval(JSON.parse(response.replace('export default ', ''))); // Evaluate the TypeScript code to get the translation object
        return translations.default || translations;
      })
    );
  }
}
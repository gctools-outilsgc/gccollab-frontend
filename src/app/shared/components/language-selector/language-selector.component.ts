import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from '../../models/language';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  
  languages: ILanguage [] = [
    {'key': 'en', 'value': this.translations.languages.english},
    {'key': 'fr', 'value': this.translations.languages.french},
  ];
  selectedLanguageKey: string = this.languages[0].key;

  constructor(private translateService: TranslateService, public translations: Translations) { }

  ngOnInit(): void {
    let currLang = this.translateService.currentLang;
    
    if (currLang === undefined)
      return;

    for (let i = 0; i < this.languages.length; i++) {
      if (currLang === this.languages[i].key) {
        this.selectedLanguageKey = this.languages[i].key;
        break;
      }
    }
  }

  update() {
    this.translateService.use(this.selectedLanguageKey);
    this.translateService.currentLang = this.selectedLanguageKey;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from '../../models/language';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from '../../models/material-button-type';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {

  @Input() isToggle: boolean = false;
  
  languages: ILanguage [] = [
    {'key': 'en', 'value': this.translations.languages.english},
    {'key': 'fr', 'value': this.translations.languages.french},
  ];
  selectedLanguageKey: string = this.languages[0].key;
  materialButtonType = MaterialButtonType;
  id: string = 'gcc-language-selector-btn-en';

  constructor(private translateService: TranslateService, public translations: Translations) { }

  ngOnInit(): void {
    this.findSelectedKey();
  }

  findSelectedKey() {
    let currLang = this.translateService.currentLang;
    
    if (currLang === undefined)
      return;

    for (let i = 0; i < this.languages.length; i++) {
      if (currLang === this.languages[i].key) {
        this.selectedLanguageKey = this.languages[i].key;
        break;
      }
    }

    this.id = 'gcc-language-selector-btn-' + this.selectedLanguageKey;
  }

  toggle() {
    this.selectedLanguageKey = this.selectedLanguageKey == this.languages[0].key ? this.languages[1].key : this.languages[0].key;
    this.update();
  }

  update() {
    this.translateService.use(this.selectedLanguageKey);
    this.translateService.currentLang = this.selectedLanguageKey;
    this.id = 'gcc-language-selector-btn-' + this.selectedLanguageKey;
  }
}

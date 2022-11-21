import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type Language = {
  key: string;
  value: string;
}

const Languages: Language [] = [
  {'key': 'en', 'value': 'LANGUAGE.ENGLISH'},
  {'key': 'fr', 'value': 'LANGUAGE.FRENCH'},
];

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  
  languages = Languages;
  selectedLanguage = Languages[0].key;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    console.log("yoyo");
    let currLang = this.translateService.currentLang;
    
    if (currLang === undefined)
      return;

    for (let i = 0; i < this.languages.length; i++) {
      if (currLang === this.languages[i].key) {
        this.selectedLanguage = this.languages[i].key;
        break;
      }
    }
  }

  update() {
    this.translateService.use(this.selectedLanguage);
    this.translateService.currentLang = this.selectedLanguage;
  }
}

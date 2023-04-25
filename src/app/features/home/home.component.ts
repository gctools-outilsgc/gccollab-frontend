import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public translations: Translations) { }

  ngOnInit(): void {
  }

}

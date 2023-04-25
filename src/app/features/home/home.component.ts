import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { ButtonType } from 'src/app/shared/models/button-type';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { MaterialColor } from 'src/app/shared/models/material-color';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public buttonTypes = ButtonType;
  public matButtonTypes = MaterialButtonType;
  public matColors = MaterialColor;

  public btnClick() {
    console.log("Button Clicked");
  }

  constructor(public translations: Translations) { }

  ngOnInit(): void {
  }

}

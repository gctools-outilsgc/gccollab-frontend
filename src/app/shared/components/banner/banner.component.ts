import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']

})

export class BannerComponent {
  hideBanner = false;

  @Input() headerExpanded: boolean = false;
  
  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.hideBanner = scrollPosition > 100; // Adjust the threshold as needed

  }
  
constructor(public translations: Translations) {}

}

@NgModule({
  imports: [CommonModule]
})
export class BannerModule { }

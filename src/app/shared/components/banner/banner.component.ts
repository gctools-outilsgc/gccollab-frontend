import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})

export class BannerComponent {

  @Input() model: Banner | null = null;
  @Input() headerExpanded: boolean = false;
  @Input() loading: boolean = false;
  
  constructor() {
    if (!this.model) {
      this.model = new Banner();
    }
  }
}

export class Banner {
  backgroundImage: string;

  constructor(backgroundImage: string = '../../../../assets/image/banner.svg') {
    this.backgroundImage = backgroundImage;
  }
}
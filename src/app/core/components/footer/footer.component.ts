import { Component, OnInit } from '@angular/core';
import { CoreRoutes } from '../../models/routes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  routes = CoreRoutes;

  constructor() { }

  ngOnInit(): void {
  }

}

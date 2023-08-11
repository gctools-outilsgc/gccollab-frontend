import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Group } from '../../models/group'; 
import { Translations } from 'src/app/core/services/translations.service';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';

 @Component({
   selector: 'app-group-card',
   templateUrl: './group-card.component.html',
   styleUrls: ['./group-card.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
 })
 export class GroupCardComponent {
   @Input() model?: Group;
   @Input() loading: boolean = false;

   routes = CoreRoutes;
   isFocused: boolean = false;

   constructor(public translations: Translations,
               private router: Router) 
   {  }

   onMouseOver() {
    this.isFocused = true;
   }

   onMouseOut() {
    this.isFocused = false;
   }

   clickEvent() {
     if (this.model) {
       this.router.navigateByUrl(CoreRoutes.Groups + '/' + this.model.id);
     }
   }
 }
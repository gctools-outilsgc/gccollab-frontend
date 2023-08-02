import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from '../../models/group'; 
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';

 @Component({
   selector: 'app-group-card',
   templateUrl: './group-card.component.html',
   styleUrls: ['./group-card.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
 })
 export class GroupCardComponent {
   @Input() model?: Group;
   @Input() loading: boolean = false;

   materialButtonType = MaterialButtonType;
   tooltipDirection = TooltipDirection;
   routes = CoreRoutes;
   groupStatus: string = 'Open';
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
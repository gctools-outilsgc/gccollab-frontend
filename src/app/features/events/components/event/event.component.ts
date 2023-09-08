import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Translations } from 'src/app/core/services/translations.service';

import { Banner } from 'src/app/shared/components/banner/banner.component';
import { Event } from '../../models/event';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';
import { InputType } from 'src/app/shared/models/input-type';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit {

  @Input() model: Event | null = null;

  banner: Banner | null = null;
  loading: boolean = true;
  bookmarked: boolean = false;
  agreeToTerms: boolean = false;

  registerFormId: string = 'gcc-event-register-form';

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  inputType = InputType;
  routes = CoreRoutes;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly eventService: EventService = inject(EventService);

  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailConfirmFormControl = new FormControl('', [Validators.required, Validators.email]);
  occupationFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(public translations: Translations,
              private viewportScroller: ViewportScroller ) {
    
  }

  ngOnInit(): void {
    if (!this.model) {
      this.eventService.mockGetEvent(this.route.snapshot.paramMap.get('id'), 3000)
      .subscribe(event => {
        this.model = event;
        this.banner = this.createBanner(this.model);
        this.loading = false;
      });
    } else {
      this.banner = this.createBanner(this.model);
      this.loading = false;
    }
  }

  createBanner(event: Event | null) : Banner | null {
    if (event?.image) {
      return new Banner(event.image);
    }
    return null;
  }

  isPast(): boolean {
    if (this.model?.startDate && this.model.startDate < new Date()) 
      return true;
    
    return false;
  }

  scrollToRegister() {
    this.viewportScroller.scrollToAnchor(this.registerFormId);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

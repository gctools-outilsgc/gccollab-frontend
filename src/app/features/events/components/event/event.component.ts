import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';

import { Banner } from 'src/app/shared/components/banner/banner.component';
import { Event } from '../../models/event';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { Location } from 'src/app/core/models/location';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';
import { Group } from 'src/app/features/groups/models/group';
import { Person } from 'src/app/core/models/person';
import { InputType } from 'src/app/shared/models/input-type';
import { Observable, map, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit {

  @Input() model: Event | null = null;
  event$: Observable<Event | null> = of(null);

  banner: Banner | null = null;
  loading: boolean = true;
  bookmarked: boolean = false;

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  inputType = InputType;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor(public translations: Translations) {
    
  }

  ngOnInit(): void {
    if (!this.model) {
      this.event$ = this.route.data.pipe(map(({ event }) => event));

      this.event$.subscribe((event: Event | null) => {
        this.model = event;
        this.banner = this.createBanner(this.model);
        this.loading = false;
      });
    }
    else {
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
}

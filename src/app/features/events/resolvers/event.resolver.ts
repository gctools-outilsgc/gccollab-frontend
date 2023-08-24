import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { Event } from '../models/event';
import { Observable, filter, take } from 'rxjs';

export const EventResolver: ResolveFn<Event> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  eventService: EventService = inject(EventService)
) : Observable<Event> => eventService.mockGetEvent(route.paramMap.get('id'), 0)
.pipe(
  filter<Event>((event: Event) => !!event),
  take(1)
);
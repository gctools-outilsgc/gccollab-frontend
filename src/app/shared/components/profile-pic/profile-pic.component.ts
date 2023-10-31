import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person } from 'src/app/core/models/person.model';
import { Translations } from 'src/app/core/services/translations.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePicComponent {

  @Input() model: Person | undefined;
  @Input() loading: boolean = false;

  constructor (public translations: Translations,
               private router: Router)
  {}

  onClick(): void {
    if (this.model) {
      this.router.navigateByUrl(CoreRoutes.Profile + '/' + this.model.id);
    }
  }
}

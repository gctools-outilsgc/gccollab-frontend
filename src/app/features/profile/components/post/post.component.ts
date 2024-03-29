import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Person } from 'src/app/core/models/person.model';
import { Translations } from 'src/app/core/services/translations.service';
import { FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() profile!: Person;
  @Input() loading: boolean = false;
  @Input() editing: boolean = false;

  formGroups: FormGroup[] = [new FormGroup({}), new FormGroup({}), new FormGroup({}), new FormGroup({})];
  formWatchSubs: Subscription[] = [];
  formChanges: boolean[] = [];

  selectedIndex = 0;
  saveCallback: () => void = this.save.bind(this);
  submitCallback: () => void = this.submit.bind(this);
  selectedForm: FormGroup = this.formGroups[this.selectedIndex];
  creating: boolean = false;

  constructor(
    public translations: Translations,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.formGroups.forEach(formGroup => {
      // Create a boolean to track when a FormGroup value has changed
      this.formChanges.push(false);
      // Create a subscription that watches each FormGroup for changes
      this.formWatchSubs.push(
        formGroup.valueChanges.subscribe(() => {
          this.formChanges[this.selectedIndex] = true;
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.formWatchSubs.forEach(formWatch => {
      if (formWatch) formWatch.unsubscribe();
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedIndex = event.index;
    this.selectedForm = this.formGroups[this.selectedIndex];
  }

  toggleEditing(event: Event) {
    if ((!this.creating && event instanceof KeyboardEvent && (event.key == 'Enter' || event.key == 'Space')) || event instanceof KeyboardEvent == false) {
      this.editing = !this.editing;
      this.selectedIndex = 0;
      this.selectedForm = this.formGroups[this.selectedIndex];
    }
  }

  formHasValues(formGroup: FormGroup): boolean {
    return Object.keys(formGroup.value).some(k => !!formGroup.value[k]);
  }

  formReady(formGroup: FormGroup): boolean {
    let allControlsValid = true;
    for (const name in formGroup.controls) {
      if (formGroup.controls[name].invalid) {
        allControlsValid = false;
        break;
      }
    }
    return allControlsValid;
  }

  save(): void {
    const formGroupJSON = JSON.stringify(this.formGroups[this.selectedIndex].value);
    this.sessionStorageService.write('gccollab-make-a-' + this.getTypeFromIndex(this.selectedIndex), formGroupJSON);
    this.formChanges[this.selectedIndex] = false;
  }

  load(): void {
    const savedFormGroupJSON = this.sessionStorageService.read('gccollab-make-a-' + this.getTypeFromIndex(this.selectedIndex));
    if (savedFormGroupJSON) {
      const savedFormData = JSON.parse(savedFormGroupJSON);
      for (const [key] of Object.entries(this.selectedForm.controls)) {
        this.selectedForm.controls[key].setValue(savedFormData[key]);
      }
      this.formChanges[this.selectedIndex] = false;
    }
  }

  submit(): void {
    if (this.selectedForm.status === 'VALID') {
      this.creating = true;
      this.selectedForm.disable();
      this.sessionStorageService.remove('gccollab-make-a-' + this.getTypeFromIndex(this.selectedIndex));

      // TODO: Setup mock service for posting forms
      setTimeout(() => {
        this.creating = false;
        this.selectedForm.enable();
        this.toggleEditing(new Event(''));
      }, 3000);
    }
  }

  private getTypeFromIndex(index: number): string {
    switch (index) {
      case 0:
        return 'post';
      case 1:
        return 'blog';
      case 2:
        return 'event';
      case 3:
        return 'poll';
      default:
        return 'error';
    }
  }
}

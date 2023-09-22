import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Editor, NgxEditorService, Toolbar } from 'ngx-editor';
import { ngxEditorLocals } from '../../factories/editor-config.factory';
import { Subscription } from 'rxjs/internal/Subscription';
import { Translations } from 'src/app/core/services/translations.service';

// https://sibiraj-s.github.io/ngx-editor/en/introduction/
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() html!: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label!: string;
  @Input() hint!: string;
  
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [ { heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],

    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  showHint: boolean = false;

  private langChangeSub!: Subscription;
  private keydownRef = this.handleKeyDown.bind(this);
  private ariaRef = this.toggleAria.bind(this);
  private dropdownRef = this.handleDropDown.bind(this);

  constructor(private translateService: TranslateService, private ngxEditorService: NgxEditorService, public translations: Translations, private elementRef: ElementRef ) {
    this.editor = new Editor({
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });

    this.langChangeSub = this.translateService.onLangChange.subscribe(() => {
      this.onLangChange();
    });
   }

  ngOnInit(): void {
    if (!this.editor) 
      this.editor = new Editor();

    if (!this.html)
      this.html = '';
  }

  ngAfterViewInit() {
    this.onLangChange();
  }

  ngOnDestroy(): void {
    if (this.editor)
      this.editor.destroy();

    if (this.langChangeSub)
      this.langChangeSub.unsubscribe();
  }

  onLangChange(): void {
    this.ngxEditorService.config.locals = ngxEditorLocals(this.translateService, this.translations);

    setTimeout(() => {
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.bold) + '"]', 
        this.translateService.instant(this.translations.editor.bold)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.italic) + '"]', 
        this.translateService.instant(this.translations.editor.italic)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.underline) + '"]', 
        this.translateService.instant(this.translations.editor.underline)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.strike) + '"]', 
        this.translateService.instant(this.translations.editor.strike)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.code) + '"]', 
        this.translateService.instant(this.translations.editor.code)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.blockquote) + '"]', 
        this.translateService.instant(this.translations.editor.blockquote)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.orderedlist) + '"]', 
        this.translateService.instant(this.translations.editor.orderedlist)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.bulletlist) + '"]', 
        this.translateService.instant(this.translations.editor.bulletlist)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.linkinsert) + '"]', 
        this.translateService.instant(this.translations.editor.linkinsert)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.imginsert) + '"]', 
        this.translateService.instant(this.translations.editor.imginsert)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.alignleft) + '"]', 
        this.translateService.instant(this.translations.editor.alignleft)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.aligncenter) + '"]', 
        this.translateService.instant(this.translations.editor.aligncenter)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.alignright) + '"]', 
        this.translateService.instant(this.translations.editor.alignright)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.alignjustify) + '"]', 
        this.translateService.instant(this.translations.editor.alignjustify)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.horizontalrule) + '"]', 
        this.translateService.instant(this.translations.editor.horizontalrule)
      );
      this.addAccessibility(
        '[title="' + this.translateService.instant(this.translations.editor.formatclear) + '"]', 
        this.translateService.instant(this.translations.editor.formatclear)
      );
      this.addAccessibility(
        '.NgxEditor__Dropdown .NgxEditor__Dropdown--Text', 
        this.translateService.instant(this.translations.editor.title)
      );
    }, 500);
  }

  placeholderText(): string {
    return this.translateService.instant(this.translations.editor.placeholder)
  }

  addAccessibility(selector: string, ariaLabel: string): void {
    let el: HTMLElement = this.elementRef.nativeElement.querySelectorAll(selector)[0];

    if (el) {
      el.removeEventListener('keydown', this.keydownRef);
      el.removeEventListener('click', this.ariaRef);

      if (el.className == 'NgxEditor__Dropdown--Text') {
        el.removeEventListener('keydown', this.dropdownRef);
        el.removeEventListener('click', this.dropdownRef);
      }
      
      el.setAttribute('tabIndex', '0');
      el.setAttribute('ariaLabel', el.classList.contains('NgxEditor__MenuItem--Active') ? ariaLabel + this.translateService.instant(this.translations.editor.enabled) : ariaLabel);

      el.addEventListener('keydown', this.keydownRef);
      el.addEventListener('click', this.ariaRef);

      if (el.className == 'NgxEditor__Dropdown--Text') {
        el.addEventListener('keydown', this.dropdownRef);
        el.addEventListener('click', this.dropdownRef);
      }
    } else 
      console.warn(selector + " not found.");
  }

  // TODO: Aria labels for drop down (enabled/disabled)
  handleDropDown(event: Event): void {
    if (event instanceof KeyboardEvent && (event.key != 'Enter' && event.key != 'Space'))
      return;

    setTimeout(() => {
      if (event.target instanceof HTMLElement && 
          event.target.className.includes('NgxEditor__Dropdown--Selected') && 
          event.target.nextSibling) {

        event.target.nextSibling.childNodes.forEach((el) => {
          if (el instanceof HTMLElement)
            el.setAttribute('tabIndex', '0');
            el.addEventListener('keydown', (event) => {
              if (event instanceof KeyboardEvent)
                this.handleKeyDown(event);
            });
        });
      }
    }, 0);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.key == 'Space') {
      event.target?.dispatchEvent(new MouseEvent('mousedown'));
      event.target?.dispatchEvent(new MouseEvent('mouseup'));
      this.toggleAria(event);
    }
  }
  
  toggleAria(event: Event) {
    setTimeout(() => {
      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('NgxEditor__MenuItem--Active') || event.target.classList.contains('NgxEditor__Dropdown--Active')) {
          event.target.setAttribute('ariaLabel', this.cleanAriaLable(event.target) + this.translateService.instant(this.translations.editor.enabled));
        } else {
          event.target.setAttribute('ariaLabel', this.cleanAriaLable(event.target));
        }
      }
    }, 250);
  }

  cleanAriaLable(el: HTMLElement): string {
    let ariaLabel = el.getAttribute('ariaLabel');
    if (ariaLabel) {
      return ariaLabel.replaceAll(this.translateService.instant(this.translations.editor.enabled), '');
    }
    return '';
  }
}

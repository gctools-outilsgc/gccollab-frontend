import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Editor, NgxEditorService, Toolbar } from 'ngx-editor';
import { ngxEditorLocals } from '../../factories/editor-config.factory';
import { Subscription } from 'rxjs/internal/Subscription';
import { Translations } from 'src/app/core/services/translations.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipDirection } from '../../models/tooltip-direction';

// https://sibiraj-s.github.io/ngx-editor/en/introduction/
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, ControlValueAccessor {
  @Input() html!: string;
  @Input() required: boolean = false;
  @Input({ required: true }) label!: string;
  @Input() hint!: string;
  @Input() autofocus: boolean = false;
  @Input({ required: true }) control!: FormControl;
  @Input() minCharacters: number = 0;
  @Input() maxCharacters: number = Number.MAX_VALUE;

  @Output() htmlChange = new EventEmitter<string>();

  @ViewChild('gccEditor') editorViewChild!: ElementRef;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  showHint: boolean = false;
  hasFocus: boolean = false;
  characterCount: number = 0;
  Number = Number;
  focusChange!: MutationObserver;
  tooltipDirection = TooltipDirection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: unknown) => {};
  onTouched = () => {};

  private langChangeSub!: Subscription;
  private keydownRef = this.handleKeyDown.bind(this);
  private ariaRef = this.toggleAria.bind(this);
  private dropdownRef = this.handleDropDown.bind(this);

  constructor(
    public translations: Translations,
    private translateService: TranslateService,
    private ngxEditorService: NgxEditorService,
    private elementRef: ElementRef
  ) {
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
    if (!this.editor) this.editor = new Editor();

    if (!this.html) {
      this.html = '';
    } else {
      this.characterCount = this.html.length;
    }
  }

  ngAfterContentInit(): void {
    if (this.control && this.html != '') this.updateCharacterCount(this.html);
  }

  ngAfterViewInit() {
    this.onLangChange();

    this.focusChange = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => {
        const classList = this.editorViewChild.nativeElement?.children[1]?.children[0]?.children[0]?.classList;
        if (classList) {
          this.hasFocus = Array.from(classList).includes('ProseMirror-focused') ? true : false;

          if (this.control && !this.hasFocus) {
            this.control.markAsTouched();
            this.control.updateValueAndValidity();
          }
        }
      });
    });

    const node = this.editorViewChild.nativeElement?.children[1]?.children[0]?.children[0];
    if (node instanceof Node) {
      this.focusChange.observe(node, {
        attributeFilter: ['class'],
      });
    }

    if (this.autofocus) this.editor.commands.focus();
  }

  ngOnDestroy(): void {
    if (this.editor) this.editor.destroy();

    if (this.langChangeSub) this.langChangeSub.unsubscribe();

    if (this.focusChange) this.focusChange.disconnect();
  }

  updateCharacterCount(content: string, markAsTouched: boolean = false) {
    this.characterCount = this.countCharactersInsideHTML(content);

    if (this.characterCount === 0) {
      this.html = '';
      this.onInputChange(this.html);
    }

    if (this.control && markAsTouched) {
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
  }

  onLangChange(): void {
    this.ngxEditorService.config.locals = ngxEditorLocals(this.translateService, this.translations);

    setTimeout(() => {
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.bold) + '"]', this.translateService.instant(this.translations.editor.bold));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.italic) + '"]', this.translateService.instant(this.translations.editor.italic));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.underline) + '"]', this.translateService.instant(this.translations.editor.underline));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.strike) + '"]', this.translateService.instant(this.translations.editor.strike));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.code) + '"]', this.translateService.instant(this.translations.editor.code));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.blockquote) + '"]', this.translateService.instant(this.translations.editor.blockquote));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.orderedlist) + '"]', this.translateService.instant(this.translations.editor.orderedlist));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.bulletlist) + '"]', this.translateService.instant(this.translations.editor.bulletlist));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.linkinsert) + '"]', this.translateService.instant(this.translations.editor.linkinsert));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.imginsert) + '"]', this.translateService.instant(this.translations.editor.imginsert));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.alignleft) + '"]', this.translateService.instant(this.translations.editor.alignleft));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.aligncenter) + '"]', this.translateService.instant(this.translations.editor.aligncenter));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.alignright) + '"]', this.translateService.instant(this.translations.editor.alignright));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.alignjustify) + '"]', this.translateService.instant(this.translations.editor.alignjustify));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.horizontalrule) + '"]', this.translateService.instant(this.translations.editor.horizontalrule));
      this.addAccessibility('[title="' + this.translateService.instant(this.translations.editor.formatclear) + '"]', this.translateService.instant(this.translations.editor.formatclear));
      this.addAccessibility('.NgxEditor__Dropdown .NgxEditor__Dropdown--Text', this.translateService.instant(this.translations.editor.title));
    }, 500);
  }

  addAccessibility(selector: string, ariaLabel: string): void {
    const el: HTMLElement = this.elementRef.nativeElement.querySelectorAll(selector)[0];

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
    } else console.warn(selector + ' not found.');
  }

  // TODO: Aria labels for drop down (enabled/disabled)
  handleDropDown(event: Event): void {
    if (event instanceof KeyboardEvent && event.key != 'Enter' && event.key != ' ') return;

    setTimeout(() => {
      if (event.target instanceof HTMLElement && event.target.className.includes('NgxEditor__Dropdown--Selected') && event.target.nextSibling) {
        event.target.nextSibling.childNodes.forEach(el => {
          if (el instanceof HTMLElement) el.setAttribute('tabIndex', '0');
          el.addEventListener('keydown', event => {
            if (event instanceof KeyboardEvent) this.handleKeyDown(event);
          });
        });
      }
    }, 0);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.key == ' ') {
      event.preventDefault();
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
    const ariaLabel = el.getAttribute('ariaLabel');
    if (ariaLabel) {
      return ariaLabel.replaceAll(this.translateService.instant(this.translations.editor.enabled), '');
    }
    return '';
  }

  countCharactersInsideHTML(html: string): number {
    let count = 0;
    let insideTag = false;

    if (html) {
      for (let i = 0; i < html.length; i++) {
        if (html[i] === '<') {
          insideTag = true;
        } else if (html[i] === '>') {
          insideTag = false;
        } else if (!insideTag) {
          count++;
        }
      }
    }

    return count;
  }

  writeValue(html: string): void {
    if (html !== undefined) {
      this.html = html;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(value: string) {
    this.html = value;
    this.onChange(this.html);
    this.htmlChange.emit(this.html);
  }
}

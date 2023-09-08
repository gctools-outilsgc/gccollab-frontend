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

  @Input() disabled: boolean = false;

  @ViewChild('[title="Bold"]') el!:ElementRef;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [ { heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ]
  html: string = '';

  private langChangeSub!: Subscription;

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
  }

  ngAfterViewInit() {
    this.applyAccessibility();
  }

  ngOnDestroy(): void {
    if (this.editor)
      this.editor.destroy();

    if (this.langChangeSub)
      this.langChangeSub.unsubscribe();
  }

  onLangChange(): void {
    this.ngxEditorService.config.locals = ngxEditorLocals(this.translateService, this.translations);
    this.applyAccessibility();
  }

  placeholderText(): string {
    return this.translateService.instant(this.translations.editor.placeholder)
  }

  applyAccessibility(): void {
    let bold = this.elementRef.nativeElement.querySelectorAll('[title="' + this.translateService.instant(this.translations.editor.bold) + '"]')[0];
    bold.setAttribute('tabIndex', '0');
    bold.setAttribute('ariaLabel', this.translateService.instant(this.translations.editor.bold));
    bold.addEventListener('click', (event: KeyboardEvent) => {
      console.log('clicked'); 
    });
    bold.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key == "Enter") {
        bold.dispatchEvent(new Event('click',));
        //bold.click();
      }
    });
  }
}

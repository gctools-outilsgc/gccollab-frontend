import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Editor, NgxEditorService, Toolbar } from 'ngx-editor';
import { ngxEditorLocals } from '../../factories/editor-config.factory';
import { Subscription } from 'rxjs/internal/Subscription';

// https://sibiraj-s.github.io/ngx-editor/en/introduction/
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
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

  constructor(private translateService: TranslateService, private ngxEditorService: NgxEditorService ) {
    this.editor = new Editor();

    this.langChangeSub = this.translateService.onLangChange.subscribe(() => {
      this.onLangChange();
    });
   }

  ngOnInit(): void {
    if (!this.editor) 
      this.editor = new Editor();
  }

  ngOnDestroy(): void {
    if (this.editor)
      this.editor.destroy();

    if (this.langChangeSub)
      this.langChangeSub.unsubscribe();
  }

  onLangChange(): void {
    this.ngxEditorService.config.locals = ngxEditorLocals(this.translateService);
  }

  placeholderText(): string {
    return this.translateService.instant('editor.placeholder')
  }
}

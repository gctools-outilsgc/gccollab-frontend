import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: string = '';

  constructor(private translateService: TranslateService) {
    this.editor = new Editor();
   }

  ngOnInit(): void {
    if (!this.editor) 
      this.editor = new Editor();
  }

  ngOnDestroy(): void {
    if (this.editor)
      this.editor.destroy();
  }

  placeholderText(): string {
    return this.translateService.instant('editor.placeholder')
  }
}

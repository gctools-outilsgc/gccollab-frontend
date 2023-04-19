import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: string = '';

  constructor() {
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
}

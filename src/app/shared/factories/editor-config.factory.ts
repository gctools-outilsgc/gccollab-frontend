import { TranslateService } from "@ngx-translate/core/lib/translate.service";
import { NgxEditorConfig } from "ngx-editor";

export function ngxEditorConfigFactory(translateService: TranslateService): NgxEditorConfig {
    return {
      locals: ngxEditorLocals(translateService)
    };
  }

export function ngxEditorLocals(translateService: TranslateService) {
  return {
    bold: translateService.instant('editor.bold'),
    italic: translateService.instant('editor.italic'),
    code: translateService.instant('editor.code'),
    underline: translateService.instant('editor.underline'),
    strike: translateService.instant('editor.strike'),
    blockquote: translateService.instant('editor.blockquote'),
    bullet_list: translateService.instant('editor.bulletlist'),
    ordered_list: translateService.instant('editor.orderedlist'),
    heading: translateService.instant('editor.heading'),
    h1: translateService.instant('editor.h1'),
    h2: translateService.instant('editor.h2'),
    h3: translateService.instant('editor.h3'),
    h4: translateService.instant('editor.h4'),
    h5: translateService.instant('editor.h5'),
    h6: translateService.instant('editor.h6'),
    align_left: translateService.instant('editor.alignleft'),
    align_center: translateService.instant('editor.aligncenter'),
    align_right: translateService.instant('editor.alignright'),
    align_justify: translateService.instant('editor.alignjustify'),
    text_color: translateService.instant('editor.textcolor'),
    background_color: translateService.instant('editor.bgcolor'),
    insertLink: translateService.instant('editor.linkinsert'),
    removeLink: translateService.instant('editor.linkremove'),
    insertImage: translateService.instant('editor.imginsert'),
    url: translateService.instant('editor.url'),
    text: translateService.instant('editor.text'),
    openInNewTab: translateService.instant('editor.opennewtab'),
    insert: translateService.instant('editor.insert'),
    altText: translateService.instant('editor.alt'),
    title: translateService.instant('editor.title'),
    remove: translateService.instant('editor.remove'),
    horizontal_rule: translateService.instant('editor.horizontalrule'),
    format_clear: translateService.instant('editor.formatclear'),
  }
}
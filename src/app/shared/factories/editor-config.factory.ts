import { TranslateService } from "@ngx-translate/core/lib/translate.service";
import { NgxEditorConfig } from "ngx-editor";
import { Translations } from "src/app/core/services/translations.service";

export function ngxEditorConfigFactory(translateService: TranslateService, translations: Translations): NgxEditorConfig {
    return {
      locals: ngxEditorLocals(translateService, translations)
    };
  }

export function ngxEditorLocals(translateService: TranslateService, translations: Translations) {
  return {
    bold: translateService.instant(translations.editor.bold),
    italic: translateService.instant(translations.editor.italic),
    code: translateService.instant(translations.editor.code),
    underline: translateService.instant(translations.editor.underline),
    strike: translateService.instant(translations.editor.strike),
    blockquote: translateService.instant(translations.editor.blockquote),
    bullet_list: translateService.instant(translations.editor.bulletlist),
    ordered_list: translateService.instant(translations.editor.orderedlist),
    heading: translateService.instant(translations.editor.heading),
    h1: translateService.instant(translations.editor.h1),
    h2: translateService.instant(translations.editor.h2),
    h3: translateService.instant(translations.editor.h3),
    h4: translateService.instant(translations.editor.h4),
    h5: translateService.instant(translations.editor.h5),
    h6: translateService.instant(translations.editor.h6),
    align_left: translateService.instant(translations.editor.alignleft),
    align_center: translateService.instant(translations.editor.aligncenter),
    align_right: translateService.instant(translations.editor.alignright),
    align_justify: translateService.instant(translations.editor.alignjustify),
    text_color: translateService.instant(translations.editor.textcolor),
    background_color: translateService.instant(translations.editor.bgcolor),
    insertLink: translateService.instant(translations.editor.linkinsert),
    removeLink: translateService.instant(translations.editor.linkremove),
    insertImage: translateService.instant(translations.editor.imginsert),
    url: translateService.instant(translations.editor.url),
    text: translateService.instant(translations.editor.text),
    openInNewTab: translateService.instant(translations.editor.opennewtab),
    insert: translateService.instant(translations.editor.insert),
    altText: translateService.instant(translations.editor.alt),
    title: translateService.instant(translations.editor.title),
    remove: translateService.instant(translations.editor.remove),
    horizontal_rule: translateService.instant(translations.editor.horizontalrule),
    format_clear: translateService.instant(translations.editor.formatclear),
  }
}
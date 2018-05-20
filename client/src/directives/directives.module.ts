import { NgModule } from '@angular/core';

import { MarkdownDirective } from './markdown.directive';
import { NavCardDirective } from './nav-card.directive';
import { SelectionCardDirective } from './select-card.directive';

@NgModule({
    declarations: [
        MarkdownDirective,
        NavCardDirective,
        SelectionCardDirective
    ],
    exports: [
        MarkdownDirective,
        NavCardDirective,
        SelectionCardDirective
    ]
})
export class VenzraDirectivesModule {
}

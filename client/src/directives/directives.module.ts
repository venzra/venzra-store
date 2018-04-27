import { NgModule } from '@angular/core';

import { MarkdownDirective } from './markdown.directive';
import { NavCardDirective } from './nav-card.directive';

@NgModule({
    declarations: [
        MarkdownDirective,
        NavCardDirective
    ],
    exports: [
        MarkdownDirective,
        NavCardDirective
    ]
})
export class VenzraDirectivesModule {
}

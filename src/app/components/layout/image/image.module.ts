import { NgModule } from '@angular/core';

import { VenzraImageDirective } from '@venzra/components/layout/image/image.directive';

@NgModule({
    declarations: [
        VenzraImageDirective
    ],
    exports: [
        VenzraImageDirective
    ]
})
export class VenzraImageModule {
}

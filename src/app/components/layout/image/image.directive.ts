import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Directive({
    selector: '[venzraImage]'
})
export class VenzraImageDirective implements OnChanges {

    public apiUrl = environment.apiUri;

    @Input() public venzraImage: string;

    constructor(
        protected element: ElementRef
    ) { }

    ngOnChanges(): void {
        this.element.nativeElement.src = this.apiUrl + '/store/images/' + this.venzraImage;
    }

}

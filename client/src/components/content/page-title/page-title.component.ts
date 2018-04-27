import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'venzra-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {

    @Input() hasBackButton: Boolean = false;

    @Input() align: 'start' | 'center' | 'end' = 'center';

    @Input() size: 'narrow' | 'standard' | 'wide' = 'standard';

    constructor(
        private location: Location
    ) { }

    getSize(viewport: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
        let width = 80;

        switch (viewport) {
            case 'xs':
                width = 95;
                break;
            case 'sm':
                width = 80;
                break;
            case 'md':
                width = 70;
                break;
            case 'lg':
                width = 60;
                break;
            case 'xl':
                width = 50;
        }

        switch (this.size) {
            case 'narrow':
                width -= 20;
                break;
            case 'wide':
                if (width <= 75) {
                    width += 20;
                } else {
                    width = 95;
                }
                break;
        }

        return `${width}%`;
    }

    goBack() {
        this.location.back();
    }

}

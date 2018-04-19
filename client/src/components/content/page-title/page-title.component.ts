import { Component, Input } from '@angular/core';

@Component({
    selector: 'venzra-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {

    @Input() size: 'narrow' | 'wide' = 'wide';

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

        if (this.size === 'narrow') {
            width -= 20;
        }

        return `${width}%`;
    }

}

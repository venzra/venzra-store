import { Component, Input } from '@angular/core';

@Component({
    selector: 'venzra-aligned',
    templateUrl: './aligned.component.html',
    styleUrls: ['./aligned.component.scss']
})
export class AlignedComponent {

    @Input() size: 'narrow' | 'standard' | 'wide' = 'standard';

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

}

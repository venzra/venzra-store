import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[venzraSelectionCard]',
    exportAs: 'selection-card'
})
export class SelectionCardDirective implements OnChanges {

    @Input('venzraSelectionCard') private venzraSelectionCard: boolean;

    @HostBinding('style.cursor') private cursor = 'pointer';

    constructor(
        private router: Router,
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) {
        this.renderer.addClass(this.elementRef.nativeElement, 'venzra-selection-card');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'transform 0.4s');
    }

    ngOnChanges(): void {
        if (this.venzraSelectionCard) {
            this.renderer.addClass(this.elementRef.nativeElement, 'selected');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'selected');
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.renderer.addClass(this.elementRef.nativeElement, 'mat-elevation-z3');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1.02, 1.02)');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.renderer.removeClass(this.elementRef.nativeElement, 'mat-elevation-z3');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1, 1)');
    }

}

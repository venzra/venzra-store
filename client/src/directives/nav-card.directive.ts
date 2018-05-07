import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[venzraNavCard]',
    exportAs: 'nav-card'
})
export class NavCardDirective {

    @Input('venzraNavCard') private venzraNavCard: Array<string>;

    @HostBinding('style.cursor') private cursor = 'pointer';

    constructor(
        private router: Router,
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) {
        this.renderer.addClass(this.elementRef.nativeElement, 'venzra-nav-card');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'transform 0.4s');
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.renderer.addClass(this.elementRef.nativeElement, 'mat-elevation-z3');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1.02, 1.02)');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.renderer.removeClass(this.elementRef.nativeElement, 'mat-elevation-z3');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1, 1)');
    }

    @HostListener('click') onClick() {
        this.router.navigate(this.venzraNavCard);
    }

}

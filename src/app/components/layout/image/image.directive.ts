import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { Subscription, VenzraImage } from '@venzra/models';
import { SubscriptionService } from '@venzra/services';

@Directive({
    selector: '[venzraImage]'
})
export class VenzraImageDirective implements OnChanges {

    private subscription: Subscription;

    @Input() public venzraImage: VenzraImage;

    constructor(
        protected element: ElementRef,
        protected subscriptionService: SubscriptionService
    ) {
        this.subscriptionService.getSubscription().subscribe((subscription) => this.subscription = subscription);
    }

    ngOnChanges(): void {
        this.element.nativeElement.src = this.venzraImage;
    }

}

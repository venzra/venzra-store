import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { Subscription, VenzraImage } from '@venzra/models';
import { SubscriptionService } from '@venzra/services';

import { environment } from '../../../../environments/environment';

@Directive({
    selector: '[venzraImage]'
})
export class VenzraImageDirective implements OnChanges {

    private subscription: Subscription;
    private cdnUrl = environment.cdnUri;

    @Input() public venzraImage: VenzraImage;

    constructor(
        protected element: ElementRef,
        protected subscriptionService: SubscriptionService
    ) {
        this.subscriptionService.getSubscription().subscribe((subscription) => this.subscription = subscription);
    }

    ngOnChanges(): void {
        this.element.nativeElement.src = `${this.cdnUrl}/${this.subscription._id}/${this.venzraImage.usage}/${this.venzraImage._id}`;
        this.element.nativeElement.alt = this.venzraImage.name;
    }

}

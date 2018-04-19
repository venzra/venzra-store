import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@venzra/layout/services/layout.service';

@Component({
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

    constructor(
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Contact us';
    }

}

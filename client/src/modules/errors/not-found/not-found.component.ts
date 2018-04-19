import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@venzra/layout/services/layout.service';

@Component({
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {

    constructor(
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Not found';
    }

}

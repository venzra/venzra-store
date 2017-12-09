import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../../../services/layout.service';

@Component({
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

    constructor(
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Welcome';
    }

}

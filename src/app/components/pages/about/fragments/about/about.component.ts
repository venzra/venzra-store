import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LayoutService } from '@venzra/services';

import { About } from '../../models/about';

@Component({
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

    public about: About;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'About us';
        this.about = this.route.snapshot.data.about;
    }

}

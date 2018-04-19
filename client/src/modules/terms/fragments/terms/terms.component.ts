import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LayoutService } from 'src/layout/services/layout.service';

import { Terms } from '../../models/terms';

@Component({
    templateUrl: './terms.component.html'
})
export class TermsComponent implements OnInit {

    public terms: Terms;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Terms and conditions';
        this.terms = this.route.snapshot.data.terms;
    }

}

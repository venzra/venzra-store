import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListModel } from '@venzra/services/restful.service';
import { LayoutService } from '@venzra/layout/services/layout.service';

import { Content } from '../../models/content';
import { Career } from '../../models/career';

@Component({
    templateUrl: './careers.component.html',
    styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {

    public page: Content;
    public careers: ListModel<Career>;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Careers';
        this.page = this.route.snapshot.data.content;

        this.careers = this.route.snapshot.data.careerData;
    }

    checkExpiry(career: Career): boolean {
        return new Date(career.expires).getTime() > new Date().setDate(new Date().getDate() + 5);
    }

}

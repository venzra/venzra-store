import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListModel } from '@venzra/services/restful.service';
import { LayoutService } from '@venzra/layout/services/layout.service';

import { Content } from '../../models/content';
import { Location } from '../../models/location';

@Component({
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

    public page: Content;
    public locations: ListModel<Location>;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Our Locations';
        this.page = this.route.snapshot.data.content;

        this.locations = this.route.snapshot.data.locationData;
    }

}

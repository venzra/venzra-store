import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { List } from '@venzra/models';
import { LayoutService } from '@venzra/services';

import { Content } from '../../models/content';
import { Location } from '../../models/location';

@Component({
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

    public page: Content;
    public locations: List<Location>;

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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'venzra-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public searchForm: FormGroup;

    constructor(
        private router: Router,
        private forms: FormBuilder
    ) { }

    ngOnInit(): void {
        this.searchForm = this.forms.group({
            search: [null, [Validators.required]]
        });
    }

    performSearch(): void {
        const search = this.searchForm.get('search').value;
        this.router.navigate(['/browse/search'], { queryParams: { search }});
    }

}

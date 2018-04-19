import { Component, OnInit } from '@angular/core';

import { LayoutService } from '@venzra/layout/services/layout.service';

@Component({
    templateUrl: './confirmation.component.html'
})
export class PasswordConfirmationComponent implements OnInit {

    constructor(
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Change password';
    }

}

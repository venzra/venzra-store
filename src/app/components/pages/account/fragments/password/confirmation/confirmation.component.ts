import { Component, OnInit } from '@angular/core';

import { LayoutService } from '@venzra/services';

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

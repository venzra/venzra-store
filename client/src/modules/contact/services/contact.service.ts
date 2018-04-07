import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Contact } from '../models/contact';

@Injectable()
export class ContactService {

    constructor(
        private http: HttpClient
    ) { }

    sendMessage(contact: Contact): void {
        this.http.post('/api/contact', contact);
    }

}

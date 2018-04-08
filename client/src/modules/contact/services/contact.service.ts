import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from '../models/contact';

@Injectable()
export class ContactService {

    constructor(
        private http: HttpClient
    ) { }

    sendMessage(contact: Contact): Promise<boolean> {
        return this.http.post<boolean>('/api/contact', contact).toPromise();
    }

}

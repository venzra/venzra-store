import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Contact } from '../models/contact';

@Injectable()
export class ContactService {

    constructor(
        private http: HttpClient
    ) { }

    sendMessage(contact: Contact): Observable<boolean> {
        return this.http.post<boolean>('/store/contact', contact);
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of as ObservableOf } from 'rxjs/internal/observable/of';

import { PasswordStrength } from '../models/password-strength';

@Injectable()
export class CustomerService {

    constructor(
        private http: HttpClient
    ) { }

    validatePassword(password: string): Observable<PasswordStrength> {
        return this.http.post<PasswordStrength>('/website/validation/password', { password })
            .pipe(catchError(() => ObservableOf({ score: 0, message: 'Validation not currently available, try again later.' })));
    }

    changePassword(password): Observable<boolean> {
        return this.http.post<boolean>('/store/customer/password', password);
    }

}

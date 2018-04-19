import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { PasswordStrength } from '../models/password-strength';

@Injectable()
export class CustomerService {

    constructor(
        private http: HttpClient
    ) { }

    validatePassword(password: string): Promise<PasswordStrength> {
        return this.http.post('/api/validation/password', { password })
            .toPromise()
            .then((result) => result as PasswordStrength)
            .catch(() => ({ score: 0, message: 'Validation not currently available, try again later.' }));
    }

    changePassword(password): Promise<boolean> {
        return this.http.post<boolean>('/api/customer/password', password).toPromise();
    }

}

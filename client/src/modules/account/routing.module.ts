import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/guard.service';
import { AuthenticationComponent } from './components/authentication/authentication.component';

import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {
        path: 'authenticate',
        component: AuthenticationComponent
    },
    {
        path: '',
        component: ProfileComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule {
}

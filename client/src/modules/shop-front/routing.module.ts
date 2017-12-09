import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreLayout } from './layout/store.layout';

import { LandingComponent } from './components/landing/landing.component';

import { ProductPromotionsResolve } from '../../services/product.service';

const routes: Routes = [
    {
        path: '',
        component: StoreLayout,
        children: [
            {
                path: '',
                component: LandingComponent,
                resolve: {
                    products: ProductPromotionsResolve
                }
            }
        ]
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
export class ShopFrontRoutingModule {
}

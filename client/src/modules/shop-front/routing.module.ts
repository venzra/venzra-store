import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './fragments/landing/landing.component';

import { ProductListResolve, ProductService } from './services/product.service';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        resolve: {
            products: ProductListResolve
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ProductService,
        ProductListResolve
    ]
})
export class ShopFrontRoutingModule {
}

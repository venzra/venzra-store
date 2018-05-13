import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './fragments/product/product.component';

import { ProductRetrieveResolve, ProductService } from './services/product.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/'
    },
    {
        path: ':product',
        component: ProductComponent,
        resolve: {
            productData: ProductRetrieveResolve
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
        ProductRetrieveResolve
    ]
})
export class ProductRoutingModule {
}

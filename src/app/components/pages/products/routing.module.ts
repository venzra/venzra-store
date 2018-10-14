import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductRetrieveResolve, ProductService } from './services/product.service';

import { ProductComponent } from './fragments/product/product.component';

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

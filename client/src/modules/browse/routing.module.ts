import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BrowseLayoutComponent } from './layout/browse.layout';

import { ProductComponent } from './components/product/product.component';

import { ProductRetrieveResolve } from '../../services/product.service';

const routes: Routes = [
    {
        path: '',
        component: BrowseLayoutComponent,
        children: [
            {
                path: 'product/:productSlug',
                component: ProductComponent,
                resolve: {
                    productData: ProductRetrieveResolve
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
export class AccountRoutingModule {
}

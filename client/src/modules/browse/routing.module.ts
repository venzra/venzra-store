import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BrowseLayout } from './layout/browse.layout';

import { ProductComponent } from './components/product/product.component';

import { ProductRetrieveResolve } from '../../services/product.service';

const routes: Routes = [
    {
        path: '',
        component: BrowseLayout,
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

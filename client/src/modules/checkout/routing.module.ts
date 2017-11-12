import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BasketComponent } from './components/basket/basket.component';

import { CartRetrieveResolve } from '../../services/cart.service';
import { ProductPromotionsResolve } from '../../services/product.service';

const routes: Routes = [
    {
        path: 'basket',
        component: BasketComponent,
        resolve: {
            cart: CartRetrieveResolve,
            products: ProductPromotionsResolve
        }
    },
    {
        path: '',
        redirectTo: 'basket',
        pathMatch: 'full'
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
export class CheckoutRoutingModule {
}

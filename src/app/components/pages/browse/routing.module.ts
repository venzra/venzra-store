import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryListResolve, CategoryRetrieveResolve, CategoryService } from './services/category.service';
import { ProductListResolve, ProductService } from './services/product.service';

import { CategoryComponent } from './fragments/category/category.component';
import { SearchComponent } from './fragments/search/search.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/'
    },
    {
        path: 'search',
        component: SearchComponent,
        resolve: {
            productData: ProductListResolve
        }
    },
    {
        path: ':category',
        component: CategoryComponent,
        resolve: {
            catalogueData: CategoryListResolve,
            categoryData: CategoryRetrieveResolve,
            productData: ProductListResolve
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
        CategoryService,
        CategoryListResolve,
        CategoryRetrieveResolve,
        ProductService,
        ProductListResolve
    ]
})
export class AccountRoutingModule {
}

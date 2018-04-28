import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueComponent } from './fragments/catalogue/catalogue.component';
import { CategoryComponent } from './fragments/category/category.component';
import { ProductComponent } from './fragments/product/product.component';
import { SearchComponent } from './fragments/search/search.component';

import { CategoryListResolve, CategoryRetrieveResolve, CategoryService } from './services/category.service';
import { ProductListResolve, ProductRetrieveResolve, ProductService } from './services/product.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CatalogueComponent,
        resolve: {
            catalogueData: CategoryListResolve
        }
    },
    {
        path: 'category/:category',
        component: CategoryComponent,
        resolve: {
            catalogueData: CategoryListResolve,
            categoryData: CategoryRetrieveResolve,
            productData: ProductListResolve
        }
    },
    {
        path: 'product/:product',
        component: ProductComponent,
        resolve: {
            productData: ProductRetrieveResolve
        }
    },
    {
        path: 'search',
        component: SearchComponent,
        resolve: {
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
        ProductListResolve,
        ProductRetrieveResolve
    ]
})
export class AccountRoutingModule {
}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VenzraRoutingModule } from '@venzra/routing.module';
import { MaterialDesignModule } from '@venzra/material.module';

import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { AuthGuard } from '@venzra/services/guard.service';
import { LayoutService } from '@venzra/layout/services/layout.service';
import { NavigationService } from '@venzra/services/navigation.service';
import { ErrorInterceptorModule } from '@venzra/services/http.interceptor';

import { AccountComponent } from '@venzra/layout/account/account.component';
import { CartComponent } from '@venzra/layout/cart/cart.component';
import { FooterComponent } from '@venzra/layout/footer/footer.component';
import { HeaderComponent } from '@venzra/layout/header/header.component';
import { SearchComponent } from '@venzra/layout/search/search.component';
import { StoreComponent } from '@venzra/layout/store.component';

import { VenzraComponent } from '@venzra/venzra.component';

@NgModule({
    declarations: [
        AccountComponent,
        CartComponent,
        FooterComponent,
        HeaderComponent,
        SearchComponent,
        StoreComponent,
        VenzraComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialDesignModule,
        VenzraDirectivesModule,
        VenzraFiltersModule,
        VenzraRoutingModule,
        ErrorInterceptorModule
    ],
    exports: [
        AccountComponent,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [
        AuthGuard,
        LayoutService,
        NavigationService
    ],
    bootstrap: [VenzraComponent]
})
export class VenzraModule {
}

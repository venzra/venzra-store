import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VenzraRoutingModule } from '@venzra/routing.module';
import { MaterialDesignModule } from '@venzra/material.module';

import { ApiInterceptorModule, AuthGuard, LayoutService, NavigationService, ErrorInterceptorModule } from '@venzra/services';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { VenzraAccountModule, VenzraCartModule, VenzraHeaderModule, VenzraSearchModule } from '@venzra/components';

import { FooterComponent } from '@venzra/components/layout/footer/footer.component';
import { StoreComponent } from '@venzra/components/layout/store.component';

import { VenzraComponent } from '@venzra/venzra.component';

@NgModule({
    declarations: [
        FooterComponent,
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
        VenzraAccountModule,
        VenzraCartModule,
        VenzraHeaderModule,
        VenzraSearchModule,
        ApiInterceptorModule,
        ErrorInterceptorModule
    ],
    exports: [
        VenzraAccountModule,
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

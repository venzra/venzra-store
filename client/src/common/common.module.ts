import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { PromotionsComponent } from './components/promotions/promotions.component';

import { PricePipe } from './filters/price.pipe';

import { ErrorInterceptorModule } from './http.interceptor';

@NgModule({
    declarations: [
        PricePipe,
        AccountComponent,
        CartComponent,
        PromotionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatToolbarModule,
        MatTooltipModule,
        ErrorInterceptorModule
    ],
    exports: [
        HttpClientModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatToolbarModule,
        MatTooltipModule,
        ErrorInterceptorModule,
        PricePipe,
        AccountComponent,
        CartComponent,
        PromotionsComponent
    ]
})
export class VenzraCommonModule {
}

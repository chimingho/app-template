import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@shared/shared.module';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { UploadModule } from '@progress/kendo-angular-upload';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ServiceProxyModule,
        SharedModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class AccountModule {

}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FileUploadComponent } from './file/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    ServiceProxyModule,
    SharedModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // ApiServiceProxies.PaymentServiceProxy
      ]
    };
  }
}

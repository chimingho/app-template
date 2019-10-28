import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';
import { AppModule } from '@app/app.module';

import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';

import * as _ from 'lodash';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { UploadModule } from '@progress/kendo-angular-upload';
import appConfig from './assets/appconfig.json';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { JwtHttpInterceptor } from '@shared/JwtHttpInterceptor';
import { NgxsModule } from '@ngxs/store';
import { Reducer, Store, Action } from 'redux';
import { PageNotFoundComponent } from './page-not-found.component';
import { GestureConfig } from '@angular/material';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        AppModule.forRoot(),
        RootRoutingModule,
        HttpClientModule,
        NotificationModule,
        UploadModule,
        DialogsModule,
        NgxsModule.forRoot([
        ]),

    ],
    declarations: [
        RootComponent,
        PageNotFoundComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
        // { provide: API_BASE_URL, useFactory: getDocumentOrigin },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [Injector, PlatformLocation],
            multi: true
        },
        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    ],
    bootstrap: [RootComponent]
})

export class RootModule {

}

export function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation) {
    return () => {
        return new Promise<any>((resolve, reject) => {
            AppConsts.appBaseHref = getBaseHref(platformLocation);
            AppConsts.appBaseUrl = getDocumentOrigin() + AppConsts.appBaseHref;
            // AppConsts.appBaseUrl = appConfig.appBaseUrl;
            AppConsts.remoteServiceBaseUrl = appConfig.remoteServiceBaseUrl;
            resolve(true);
        });
    };
}

export function getRemoteServiceBaseUrl(): string {
    return AppConsts.remoteServiceBaseUrl;
}

export function getBaseHref(platformLocation: PlatformLocation): string {
    // const baseUrl = document.getElementsByTagName('base')[0].href;
    const baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}

function getDocumentOrigin() {
    if (!document.location.origin) {
        const port = document.location.port ? ':' + document.location.port : '';
        return document.location.protocol + '//' + document.location.hostname + port;
    }

    return document.location.origin;
}



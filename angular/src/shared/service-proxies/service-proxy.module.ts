import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import * as ApiServiceProxies from './service-proxies';
import {JwtHttpInterceptor} from '@shared/JwtHttpInterceptor';

@NgModule({
    providers: [
        //ApiServiceProxies.SessionServiceProxy,
        //ApiServiceProxies.TokenAuthServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }

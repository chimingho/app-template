import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LoginServiceProxy, Authenticate, AuthenticateResult } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { BehaviorSubject, Observable, of, from, pipe } from 'rxjs';


@Injectable()
export class AppAuthService {
    redirectUrl: string;

    rememberMe: boolean;
    authenticateModel: Authenticate;
    authenticateResult: AuthenticateResult;

    constructor(
        private loginServiceProxy: LoginServiceProxy,
        private router: Router,
    ) {
        this.clearToken();
    }

    authenticate(finallyCallback?: () => void): Observable<AuthenticateResult> {
        finallyCallback = finallyCallback || (() => { });

        const svcs$ = this.loginServiceProxy.authenticate(this.authenticateModel);
        svcs$.pipe(finalize(() => { finallyCallback(); }))
            .subscribe((result: AuthenticateResult) => {
                this.authenticateResult = result;
                this.processAuthenticateResult(result);
            },
                (res) => { console.log(res) });

        return svcs$;
    }

    private processAuthenticateResult(authenticateResult: AuthenticateResult) {
        if (authenticateResult.accessToken) {
            // Successfully logged in
            this.login(
                authenticateResult.accessToken,
                authenticateResult.encryptedAccessToken,
                authenticateResult.expireInSeconds,
                this.rememberMe);

        } else {
            // Unexpected result!
            //this._logService.warn('Unexpected authenticateResult!');
            //this.router.navigate(['account/login']);
        }
    }

    private login(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean): void {

        const tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;
        sessionStorage.setItem('accessToken', accessToken);
        if(tokenExpireDate) {sessionStorage.setItem('tokenExpireDate', tokenExpireDate.toJSON());}

        let initialUrl = this.redirectUrl;
        if (!initialUrl || initialUrl.indexOf('/login') > 0) {
            initialUrl = AppConsts.appBaseUrl;
        }
        this.router.navigate([initialUrl]);
        //location.href = initialUrl;
    }

    private clearToken(): void {
        this.authenticateModel = new Authenticate();
        this.authenticateModel.rememberClient = false;
        this.authenticateResult = null;
        this.rememberMe = false;
    }

    getAuthToken(){
        return sessionStorage.getItem('accessToken');
    }

    isLoggedIn(): boolean{
        if (sessionStorage.accessToken) {
            return true;
        }
        return false;
    }

    logout(reload?: boolean): void {
        this.clearToken();
		//TODO:setCookieValue
        if (reload !== false) {
            location.href = AppConsts.appBaseUrl;
        }
    }
}

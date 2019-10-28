import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from, pipe} from 'rxjs';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, 
    HttpResponse, HttpErrorResponse, HttpHeaders, HttpHeaderResponse, 
    HttpProgressEvent, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { AppAuthService } from './auth/app-auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authService: AppAuthService) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        if(!token) return req; 
        let newReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        return newReq;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(this.addToken(req, this.authService.getAuthToken()));
        /*
        .pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        //case 400:
                        //return //this.handle400Error(error);
                        case 401:
                        return this.handle401Error(req, next);
                    }
                } else {
                    return Observable.throw(error);
                }
            })
        );
        */
    }

    //https://www.intertech.com/Blog/angular-4-tutorial-handling-refresh-token-with-new-httpinterceptor/
    /*
    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
 
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
 
            return this.authService.refreshToken()
                .switchMap((newToken: string) => {
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
                    }
 
                    // If we don't get a new token, we are in trouble so logout.
                    return this.authService.logout();
                })
                .catch(error => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    return this.authService.logout();
                })
                .finally(() => {
                    this.isRefreshingToken = false;
                });
        } else {
            return this.tokenSubject
                .filter(token => token != null)
                .take(1)
                .switchMap(token => {
                    return next.handle(this.addToken(req, token));
                });
        }
    }
    */
 

}
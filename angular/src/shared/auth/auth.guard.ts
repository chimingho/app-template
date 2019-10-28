import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AppAuthService} from './app-auth.service' ;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AppAuthService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    return this.checkLogin(url)
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivateChild called');
    return this.canActivate(next, state);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) { return true; }

    this.authService.redirectUrl = url;
    this.router.navigate(['/account/login']);
    return false;
  }
}

import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BehaviorSubject, Observable, of, from, pipe } from 'rxjs';
import { LoginServiceProxy, Authenticate, AuthenticateResult } from '@shared/service-proxies/service-proxies';
import { AppAuthService } from '@shared/auth/app-auth.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],

})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  isLoggedinFailed = false;

  constructor(
    injector: Injector,
    public loginService: AppAuthService /*LoginService*/
  ) {
    super(injector);
  }

  get isSelfRegistrationAllowed(): boolean {
    return true;
    
  }

  login(): void {
    this.submitting = true;
    this.isLoggedinFailed = false;
    this.loginService.authenticate(() => {this.submitting = false; })
    .subscribe((result: AuthenticateResult) => {
      if (!result.accessToken) {this.isLoggedinFailed = true;}
    },
  (res)=>{console.log(res)});
}
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FileUploadComponent } from './file/file-upload.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AppComponent,
        canActivateChild: [/*AuthGuard*/],
        children: [
          { path: 'file', component: FileUploadComponent, canActivate: [/*AuthGuard*/] }
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/app', pathMatch: 'full' },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule', // Lazy load account module
        data: { preload: true }
    },
    {
        path: 'app',
        loadChildren: './app/app.module#AppModule', // Lazy load account module
        data: { preload: true }
    },
    {
        path: 'example',
        loadChildren: './example/example.module#ExampleModule',
        data: { preload: true }
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }

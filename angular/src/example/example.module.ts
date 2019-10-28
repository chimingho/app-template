import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { ReduxLocalStateComponent } from './redux-local-state/redux-local-state.component';
import { ReduxGlobalStateComponent } from './redux-global-state/redux-global-state.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

@NgModule({
  declarations: [
    ReduxLocalStateComponent, ReduxGlobalStateComponent,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent

  ],
  imports: [
    CommonModule,
    ExampleRoutingModule
  ]
})
export class ExampleModule { }

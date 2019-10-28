import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReduxLocalStateComponent } from './redux-local-state/redux-local-state.component';
import { ReduxGlobalStateComponent } from './redux-global-state/redux-global-state.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'reduxlocalstate', component: ReduxLocalStateComponent },
      { path: 'reduxglobalstate', component: ReduxGlobalStateComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule { }

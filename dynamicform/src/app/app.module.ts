import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InMemoryDataService } from '../shared/in-memory-data.service';
import { QuestionFormComponent } from './question/question-form.component';
import { PageNodeComponent } from './question/page-node.component';

import { PageNodeService } from '../shared/page-node.service';
import { QuestionFormCollectorComponent } from './question/question-form-collector.component';
import { AddAttributeDirective } from './question/add-attribute.directive';
import { SummaryItemComponent } from './question/summary-item.component';
import { NavbarComponent } from './layout/navbar.component';
import { SidebarComponent } from './layout/sidebar.component';
import { FooterComponent } from './layout/footer.component';
import { QuestionMenuComponent } from './question/question-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionFormComponent,
    PageNodeComponent,
    QuestionFormCollectorComponent,
    AddAttributeDirective,
    SummaryItemComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    QuestionMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [PageNodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

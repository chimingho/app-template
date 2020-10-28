import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { QuestionFormComponent } from './question-form.component';
import { QuestionFormCollectorComponent } from './question-form-collector.component';

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    DynamicFormComponent, DynamicFormQuestionComponent, QuestionFormComponent, QuestionFormCollectorComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    CommonModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

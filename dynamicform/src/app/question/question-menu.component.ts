import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { PageNodeModel } from '@shared/page-node-model';

@Component({
  selector: 'app-question-menu',
  templateUrl: './question-menu.component.html',
  styleUrls: ['./question-menu.component.scss']
})
export class QuestionMenuComponent implements OnInit {
  @Input() page: PageNodeModel;
  @Output() formEvent = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit(): void {
  }

}

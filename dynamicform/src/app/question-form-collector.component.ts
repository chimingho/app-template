import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CollectorList } from './shared/page-node-model';

@Component({
  selector: 'app-question-form-collector',
  templateUrl: './question-form-collector.component.html',
  styleUrls: ['./question-form-collector.component.css']
})
export class QuestionFormCollectorComponent implements OnInit {

  @Input() collector: CollectorList;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.collector.Id].valid; }

  constructor() { }

  ngOnInit(): void {
  }

}

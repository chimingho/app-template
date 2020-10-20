import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CollectorList } from './shared/page-node-model';
import { QuestionCollectorService } from './shared/question-collector.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [ QuestionCollectorService ]

})
export class QuestionFormComponent implements OnInit {

  @Input() collectors: CollectorList[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionCollectorService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.collectors);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}

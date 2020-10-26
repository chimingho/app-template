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
  get errorMessage() {
    const errors = this.form.controls[this.collector.Id].errors;
    //{ "maxlength": { "requiredLength": 10, "actualLength": 21 }, "pattern": { "requiredPattern": "^([- .A-Za-z0-9])*$", "actualValue": "xxx @ afdasf sdaf sa" } }
    if(errors.required) return this.collector.Label + " is required";
    if(errors.maxlength) return  errors.maxlength.requiredLength + " characters are allowed";
    if(errors.pattern) {

      let msg;
      for(let v of this.collector.ValidationRuleList){
        if(errors.pattern.requiredPattern.includes(v.Regex)) {
          msg =  v.Message;
          break;
        }
      }
      return msg;
    }
    return this.form.controls[this.collector.Id].errors;
  
  }

  constructor() { }

  ngOnInit(): void {
  }

}

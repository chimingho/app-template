import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CollectorList } from '@shared/page-node-model';

@Component({
  selector: 'app-question-form-collector',
  templateUrl: './question-form-collector.component.html',
  styleUrls: ['./question-form-collector.component.css']
})
export class QuestionFormCollectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  @Input() collector: any;
  @Input() form: FormGroup;

  get isInvalid() {
    const formControl = this.form.controls[this.collector.HtmlName];
    return (formControl.dirty || formControl.touched) && formControl.invalid;
  }
  get errorMessage() {
    const formControl = this.form.controls[this.collector.HtmlName];
    if (!formControl) { return null; }

    const errors = formControl.errors;
    // { "maxlength": { "requiredLength": 10, "actualLength": 21 }, "pattern": { "requiredPattern": "^([- .A-Za-z0-9])*$", "actualValue": "xxx @ afdasf sdaf sa" } }
    if (errors?.required) { return this.collector.Label + " is required"; }
    if (errors?.maxlength) { return errors.maxlength.requiredLength + " characters are allowed"; }
    if (errors?.pattern) {

      let msg;
      for (let v of this.collector.ValidationRuleList) {
        if (errors.pattern.requiredPattern.includes(v.Regex)) {
          msg = v.Message;
          break;
        }
      }
      return msg;
    }
    return formControl.errors;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CollectorList } from './shared/page-node-model';
import { QuestionCollectorService } from './shared/question-collector.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [QuestionCollectorService]

})
export class QuestionFormComponent implements OnInit {

  @Input() page: any;
  @Input() collectors: CollectorList[] = [];
  form: FormGroup;

  payLoad = '';

  constructor() { }

  ngOnInit() {
    this.form = this.toFormGroup(this.collectors);
  }

  populate() {
    this.form.patchValue(this.collectors);
  }

  update() {
    //ajax update call 

  }

  onSubmit(event) {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  toFormGroup(collectors: CollectorList[]) {
    const group: any = {};

    collectors?.forEach(collector => {

      let defaultVal = collector.DefaultValue;
      switch (collector.FormInputTypeCode) {
        case 'Radio':
        case 'RadioInline':
          defaultVal = this.getSelectedOption(collector.OptionList);
          break;

      }


      const control = new FormControl(defaultVal || '');
      const validators: any = [];
      const errors: any = [];

      // add validator rules there
      if (collector.IsRequired) { validators.push(Validators.required); }
      if (collector.MaxCharacters > 0) { validators.push(Validators.maxLength(collector.MaxCharacters)); }
      collector.ValidationRuleList.forEach(validator => {
        validators.push(Validators.pattern(validator.Regex));
      });
      control.setValidators(validators);
      group[collector.HtmlName] = control;

    });

    return new FormGroup(group);
  }

  sort(array): any {
    return array.sort((a, b) => a.SortOrder - b.SortOrder);
  }

  getSelectedOption(options) {
    return options.filter(o => o.IsSelected)[0]?.Value || '';
  }

  setSelectedOption(options, val) {
  }

}

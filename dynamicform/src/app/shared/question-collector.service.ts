import { Injectable } from '@angular/core';
import { CollectorList, PageNodeModel } from './page-node-model';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class QuestionCollectorService {

  constructor() { }

  toFormGroup(collectors: CollectorList[]) {
    const group: any = {};

    collectors.forEach(collector => {
      const control = new FormControl(collector.DefaultValue || '');
      const validators: any = [];
      const errors: any = [];

      //add validator rules there
      if(collector.IsRequired) validators.push(Validators.required);
      if(collector.MaxCharacters > 0) validators.push(Validators.maxLength(collector.MaxCharacters));
      collector.ValidationRuleList.forEach(validator => {
        validators.push(Validators.pattern(validator.Regex));
      });
      control.setValidators(validators);
      group[collector.Id] = control;

    });

    return new FormGroup(group);
  }
}

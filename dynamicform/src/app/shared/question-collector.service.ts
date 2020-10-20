import { Injectable } from '@angular/core';
import { CollectorList, PageNodeModel } from './page-node-model';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class QuestionCollectorService {

  constructor() { }

  toFormGroup(collectors: CollectorList[]) {
    const group: any = {};

    collectors.forEach(collector => {
      let control = new FormControl(collector.DefaultValue || '');
      //add validator rules there
      group[collector.Id] = control;

    });

    return new FormGroup(group);
  }
}

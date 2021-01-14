import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNodeModel, CollectorList, OptionList, QuestionBlockList } from '@shared/page-node-model';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {
  @Input() questionBlock: QuestionBlockList;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  sort(array): any {
    return array.sort((a, b) => a.SortOrder - b.SortOrder);
  }
  test() {
    return this.questionBlock.SummaryItemHeaderDict;


  }


}

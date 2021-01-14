import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { PageNodeModel, CollectorList, OptionList, QuestionBlockList } from '@shared/page-node-model';
import { formatDate, formatNumber, DatePipe } from '@angular/common';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  providers: []
})
export class QuestionFormComponent implements OnInit {
  @Input() page: PageNodeModel;
  @Output() formEvent = new EventEmitter<FormGroup>();
  form: FormGroup;
  //SummaryFormGroupName = 'SummaryItemList';

  payLoad = '';

  constructor(/*private ref: ChangeDetectorRef*/) { }

  ngOnInit() {
    this.form = this.toFormGroup(this.page.QuestionBlockList);
  }

  populate() {
    this.form.patchValue(this.form);
  }

  update() {
    //ajax update call 

  }

  onSubmit($event, form) {
    //TODO: integrate with API call on ActionButton click event
    let id = $event.submitter.id;
    //this.form.get($event.submitter.id)?.setValue($event.submitter.value);

    this.payLoad = JSON.stringify(form.getRawValue());
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }

    this.formEvent.emit(form);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  toFormGroup(questionBlockList: QuestionBlockList[]) {
    //const group: any = {};
    const fg = new FormGroup({});

    questionBlockList?.forEach(qb => {
      let childGroup = new FormGroup({});
      fg.addControl(qb.QuestionBlockTypeCode, childGroup)
      qb.CollectorList?.forEach(collector => {
        childGroup.addControl(collector.HtmlName, this.toFormControl(collector));
      });

      let summaryGroup = new FormGroup({});
      childGroup.addControl('SummaryItemList', summaryGroup)
      qb.SummaryItemList?.forEach(item => {
        item.CollectorModelList.forEach(collector => {
          summaryGroup.addControl(collector.HtmlName, this.toFormControl(collector));
        });
      });

      this.interCollectorEvent(qb, childGroup)
    });

    //return new FormGroup(group);
    return fg;
  }

  interCollectorEvent(qb, form) {
    qb.CollectorList?.forEach(collector => {
      switch (true) {
        case collector.JQueryCode.includes('calculateTotal'): //PercentUseTotal
          let summaryForm = form.get('SummaryItemList');
          let summaryItems = qb.SummaryItemList;
          summaryForm.valueChanges.subscribe(controls => {
            let total = 0;
            summaryItems.forEach(item => {
              item.CollectorModelList.forEach(c => {
                total += +summaryForm.controls[c.HtmlName].value;
              });
            });
            //Note: value property didn't trigger change event
            //form.controls[collector.HtmlName].value = total;
            form.get(collector.HtmlName).setValue(total);
          });
          break;
        default:
          break;
      }
    });
  }


  toFormControl(collector: any) {
    let defaultVal = collector.DefaultValue;
    switch (collector.FormInputTypeCode) {
      case 'Radio':
      case 'RadioInline':
        defaultVal = this.getSelectedOption(collector.OptionList);
        break;
      case 'TextBox':
        collector.FormInputTypeCode = this.getInputType(collector);
        break;
    }

    const control = new FormControl(defaultVal || '');
    const validators: any = [];
    const errors: any = [];

    //transform old jquerycode field in a collector
    switch (true) {
      case collector.JQueryCode.includes('datepicker'): //PercentUseTotal
        collector.FormInputTypeCode = 'date';
        const today = formatDate(Date.now(), 'yyyy-MM-dd', 'en')
        collector.OptionalHtmlAttributes = {
          min: today
        };
        //TODO: date type requires custom validator. 
        validators.push(CustomValidators.dateMinimum(today));
        break;
      default:
        break;
    };



    // add validator rules there
    if (collector.IsRequired) { validators.push(Validators.required); }
    if (collector.MaxCharacters > 0) { validators.push(Validators.maxLength(collector.MaxCharacters)); }
    else {
      const anotherMaxLengthPlace = +this.getAttributeValue(collector.OptionalHtmlAttributes, 'maxlength');
      if (anotherMaxLengthPlace > 0) { validators.push(Validators.maxLength(anotherMaxLengthPlace)); }
    }

    collector.ValidationRuleList.forEach(validator => {
      //TODO: temp solution to hack date type from current data schema
      if (validator.TypeCode === 'Date') collector.FormInputTypeCode = 'date';
      else
        validators.push(Validators.pattern(validator.Regex));
    });
    control.setValidators(validators);
    return control;
  }


  sort(array): any {
    return array.sort((a, b) => a.SortOrder - b.SortOrder);
  }

  getSelectedOption(options) {
    return options.filter(o => o.IsSelected)[0]?.Value || '';
  }

  setSelectedOption(options, val) {
  }

  getAttributeValue(OptionalHtmlAttributes: string, attributeName: string): string {
    //const regex = /maxlength\s*=\s*"(\d+)"/g;
    const regex = new RegExp(attributeName + '\\s*=\\s*"(\\d+)"', 'g');
    let rslt = regex.exec(OptionalHtmlAttributes);
    if (rslt) return rslt[1];
    else return '' //'/\d+((.|,)\d+)?/'
  }

  getInputType(collector: CollectorList): string {
    let rslt = new RegExp('maxlength=\"3\"').test(collector.OptionalHtmlAttributes);
    if (rslt) return 'number'

    return collector.FormInputTypeCode;
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    /*
    let invalid = false;
    const from = this.fg && this.fg.get("from").value;
    const to = this.fg && this.fg.get("to").value;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }
    return invalid ? { invalidRange: { from, to } } : null;
    */
    return null;
  };
}


export class CustomValidators {
  static dateMinimum(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const validationDate = new Date(date);
      const controlDate = new Date(control.value);

      return controlDate >= validationDate ? null : {
        'dateMinimum': {
          'required': date,
          'actual': control.value
        }
      };
    };
  }

  static dateMaximum(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const validationDate = new Date(date);
      const controlDate = new Date(control.value);

      return controlDate <= validationDate ? null : {
        'dateMaximum': {
          'required': date,
          'actual': control.value
        }
      };
    };
  }


  /*
  static fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const fromDate = formGroup.get(fromDateField).value;
      const toDate = formGroup.get(toDateField).value;
      // Ausing the fromDate and toDate are numbers. In not convert them first after null check
      if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
        return { [errorName]: true };
      }
      return null;
    };
  }
  */
}

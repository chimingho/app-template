import {CollectorList, OptionList, Pager, ValidationRuleList} from './shared/page-node-model';

export class QuestionBase<T> implements CollectorList  {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: {key: string, value: string}[];
 
  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
 

  Id: number;
  Label: string;
  LabelCssClass: null;
  DefaultValue: string;
  MaxWidth: number;
  MaxCharacters: number;
  Rows: number;
  OptionList: OptionList[];
  DataDictionaryId: number;
  FormInputTypeCode: string;
  LookupTable: string;
  CustomCollectorDotNETFunction: null;
  IsNewLine: boolean;
  SortOrder: number;
  CssStyleOptions: null;
  CssClass: null;
  OptionalHtmlAttributes: null;
  ValidationRuleList: ValidationRuleList[];
  IsRequired: boolean;
  JQuerySelector: null;
  JQueryCode: string;
  ObjectNumber: null;
  CollectorTypeCd: string;
  Pager: Pager;
  HtmlIdentifier: string;
  HtmlName: string;
}

// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface PageNodeModel {
    Breadcrumb: { [key: string]: any };
    IsBackViewable: boolean;
    IsCancelTreeButtonVisible: boolean;
    IsContinueButtonVisible: boolean;
    IsEndingTreeNode: boolean;
    Menu: Menu;
    QuestionBlockList: QuestionBlockList[];
    RecordIdentifier: RecordIdentifier;
    SectionTreeGuid: string;
    Title: string;
    TypeCode: string;
}

export interface Menu {
    CurrentMenuText: null;
    IsShowMenu: boolean;
    MenuModelItemList: any[];
    SectionTreeGuid: string;
}

export interface QuestionBlockList {
    CollectorList: CollectorList[];
    IsLastBlockOnPage: boolean;
    IsSummary: boolean;
    LanguageList: LanguageList[];
    QuestionBlockTypeCode: string;
    SortOrder: number;
    SummaryItemHeaderDict: { [key: string]: SummaryItemHeaderDict } | null;
    SummaryItemList: SummaryItemList[] | null;
    Title: string;
}

export interface CollectorList {
    CollectorTypeCd: string;
    CssClass: null;
    CssStyleOptions: null;
    CustomCollectorDotNETFunction: null;
    DataDictionaryId: number | null;
    DefaultValue: string;
    FormInputTypeCode: string;
    HtmlIdentifier: string;
    HtmlName: string;
    Id: number;
    IsNewLine: boolean;
    IsRequired: boolean;
    JQueryCode: string;
    JQuerySelector: null;
    Label: string;
    LabelCssClass: null;
    LookupTable: null | string;
    MaxCharacters: number;
    MaxWidth: number;
    ObjectNumber: null;
    OptionalHtmlAttributes: null;
    OptionList: OptionList[];
    Pager: null | Pager;
    Rows: number;
    SortOrder: number;
    ValidationRuleList: ValidationRuleList[];
}

export interface OptionList {
    Description: string;
    IsSelected: null;
    SortOrder: number;
    Value: string;
}

export interface Pager {
    CurrentPage: number;
    EndPage: number;
    PageSize: number;
    StartPage: number;
    TotalItems: number;
    TotalPages: number;
}

export interface ValidationRuleList {
    Message: string;
    Regex: string;
    TypeCode: string;
}

export interface LanguageList {
    Language: string;
    SortOrder: number;
    Type: number;
}

export interface SummaryItemHeaderDict {
    Colspan: null;
    ColumnNumber: number;
    CssClass: null;
    IsCssAppliedToColumn: boolean;
    LabelText: string;
}

export interface SummaryItemList {
    CollectorModelList: any[];
    Column1: string;
    Column2: string;
    Column3: string;
    Column4: string;
    Column5: string;
    Column6: string;
    ObjectNumber: number;
    ObjectTypeCd: null;
    SummaryItemActionList: any[];
}

export interface RecordIdentifier {
    ApplicationTypeCd: string;
    BatchId: number;
    CarrierId: number;
    CustomizationGroupMembershipArray: number[];
    CustomizationGroupMembershipString: string;
    ExceptionGroupId: number;
    ObjectNumber: null;
    ParentObjectNumber: null;
    ProgramId: number;
    QpcIdNum: string;
    RiskStateCd: string;
    RuleGroupId: number;
}

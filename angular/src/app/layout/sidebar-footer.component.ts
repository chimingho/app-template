import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './sidebar-footer.component.html',
    selector: 'sidebar-footer',
    styleUrls: ['./sidebar-footer.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SideBarFooterComponent extends AppComponentBase {

    constructor(
        injector: Injector
    ) {
        super(injector);

    }
}

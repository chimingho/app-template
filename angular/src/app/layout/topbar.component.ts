import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase {

    constructor(injector: Injector,
                private notificationService: NotificationService,
        ) {
        super(injector);
    }

    ngOnInit() {}



    private sendNotification(contentStr: string, typeOption: any, closable: boolean) {
        this.notificationService.show({
          content: contentStr,
          // cssClass: cssClassStr,
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'right', vertical: 'top' },
          type: typeOption,
          hideAfter: 5000,
          closable
        });
      }

}

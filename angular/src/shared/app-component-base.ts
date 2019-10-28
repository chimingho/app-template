import { Injector, ElementRef } from '@angular/core';

export abstract class AppComponentBase {

    constructor(injector: Injector) { }

    isGranted(permissionName: string): boolean {
        return true;
    }

}

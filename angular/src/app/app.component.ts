import { Component, ViewContainerRef, Injector, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AppComponentBase implements OnInit, OnDestroy, AfterViewInit {

  versionText = '1.0.0';
  currentYear: number;

  private viewContainerRef: ViewContainerRef;
  opened = false;
  mobileQuery: MediaQueryList;

  constructor(
    injector: Injector,
    // changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

  onResize(event) {
  }
}


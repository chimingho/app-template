import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CollectorList, PageNodeModel, Menu } from '@shared/page-node-model';
import { PageNodeService } from '../../shared/page-node.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { LayoutService } from '../layout/layout.service';

@Component({
  selector: 'app-page-node',
  templateUrl: './page-node.component.html',
  styleUrls: ['./page-node.component.scss']
})
export class PageNodeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  page$: Observable<any>;

  constructor(private pageService: PageNodeService, private layoutService: LayoutService) {
    this.page$ = pageService.getPage();
    const sPage = this.page$.subscribe(
      x => console.log('Page got a next value: ' + x),
      err => console.error('Page Observer got an error: ' + err),
      () => console.log('Page Observer got a complete notification')
    );

    this.subscription.add(sPage);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sortMenuModule(array): any {
    return array.sort((a, b) => a.ModuleOrder - b.ModuleOrder);
  }

  onSubmit(event: FormGroup) {
    const payLoad = JSON.stringify(event.getRawValue());
    //this.page$ = this.pageService.getNextPage('');
  }

  onQuestionMenuClick(event: any) {
    this.page$ = this.pageService.getNextPage(event.ModuleTypeCd);
  }

  /**
   * left sidebar in layout
   */
  getClasses() {
    const classes = {
      'pinned-sidebar': this.layoutService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.layoutService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }


  toggleSidebarPin() {
    this.layoutService.toggleSidebarPin();
  }




  /**
   * question menu sidebar on the right
   */
  isQuestionSidebarPinned: boolean = false;
  toggleQuestionSidebarPin() {
    this.isQuestionSidebarPinned = !this.isQuestionSidebarPinned;
  }

  getQuestionMenuClasses(menuItem) {
    const classes = {
      'completed': menuItem.isCompleted,
      'current': menuItem.isCurrentModule
    }
    return classes;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageNodeModel } from '@shared/page-node-model';
import { LayoutService } from './layout.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() page: PageNodeModel;
  @Output() formEvent = new EventEmitter<any>();


  constructor(private layoutService: LayoutService) { }
  isCollapsed = true;

  ngOnInit(): void {
  }


  toggleSidebarPin() {
    this.layoutService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }


  //question modules 
  getQuestionMenuClasses(menuItem) {
    const classes = {
      'completed': menuItem.isCompleted,
      'current': menuItem.isCurrentModule,
      'disabled': !menuItem.isCompleted
    }
    return classes;
  }
  sortMenuModule(array): any {
    return array.sort((a, b) => a.ModuleOrder - b.ModuleOrder);
  }

  onQuestionMenuClick($event, menu) {
    this.formEvent.emit(menu);
  }

}

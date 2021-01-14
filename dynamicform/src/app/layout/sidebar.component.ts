import { Component, Input, OnInit } from '@angular/core';
import { PageNodeModel } from '@shared/page-node-model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() page: PageNodeModel;

  constructor() { }

  ngOnInit(): void {
  }

}

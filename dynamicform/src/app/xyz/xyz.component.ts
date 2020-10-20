import { Component, OnInit } from '@angular/core';
import model from '../PageNodeModel.json';

import { Observable } from 'rxjs';
import { CollectorList } from '../shared/page-node-model';
import { QuestionCollectorService} from '../shared/question-collector.service';
import { PageService} from '../shared/page.service';


@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css'],
  providers:  [QuestionCollectorService],
})
export class XyzComponent implements OnInit {

  page = model;
  collectors$: Observable<CollectorList[]>;

  constructor(collectorService: QuestionCollectorService, pageService: PageService) {
    this.collectors$ = pageService.getCollectors();
  }

  ngOnInit(): void {
  }

}

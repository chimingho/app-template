import { Component, OnInit } from '@angular/core';
import model from '../PageNodeModel.json';

import { Observable } from 'rxjs';
import { CollectorList, PageNodeModel } from '../shared/page-node-model';
import { QuestionCollectorService} from '../shared/question-collector.service';
import { PageService} from '../shared/page.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css'],
  providers:  [QuestionCollectorService],
})
export class XyzComponent implements OnInit {

  //page = model;
  page$: Observable<any>;
  collectors$: Observable<CollectorList[]>;
  subscription: Subscription = new Subscription();

  constructor(collectorService: QuestionCollectorService, pageService: PageService) {
    this.collectors$ = pageService.getCollectors();
    const sCollector = this.collectors$.subscribe(
      x => console.log('Collector got a next value: ' + x),
      err => console.error('Collector Observer got an error: ' + err),
      () => console.log('Collector Observer got a complete notification')
    );


    this.page$ = pageService.getPage();
    const sPage = this.page$.subscribe(
      x => console.log('Page  got a next value: ' + x),
      err => console.error('Page Observer got an error: ' + err),
      () => console.log('Page Observer got a complete notification')
    );

    this.subscription.add(sCollector);
    this.subscription.add(sPage);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

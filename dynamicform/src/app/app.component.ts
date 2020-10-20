import { Component } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionBase } from './question-base';
import { Observable } from 'rxjs';
import { CollectorList } from './shared/page-node-model';
import { QuestionCollectorService} from './shared/question-collector.service';
import { PageService} from './shared/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:  [QuestionService, QuestionCollectorService]

})
export class AppComponent {
  title = 'test1';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornadoxx'];
  myHero = this.heroes[0];

  questions$: Observable<QuestionBase<any>[]>;
  collectors$: Observable<CollectorList[]>;

  constructor(service: QuestionService, collectorService: QuestionCollectorService, pageService: PageService) {
    this.questions$ = service.getQuestions();
    this.collectors$ = pageService.getCollectors();
  }


};
